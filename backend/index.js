const express = require('express');
const cors = require('cors');
const bd = require('./bd');
const fs = require('fs');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

const port = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Função para remover tags HTML de um texto
function removeHtmlTags(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, '');
}

// Rotas
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Endpoint para obter todos os golpes
app.get('/golpes', async (req, res) => {
  try {
    const golpes = await bd.query('SELECT * FROM Golpes');
    res.json(golpes);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os golpes' });
  }
});

// Endpoint para obter dados de um golpe específico
app.get('/golpes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Busca o golpe
    const [golpes] = await bd.query(`
      SELECT 
        id,
        titulo,
        descricao,
        data,
        usuario_id
      FROM 
        golpes
      WHERE 
        id = ?
    `, [id]);

    if (!golpes || golpes.length === 0) {
      return res.status(404).json({ error: 'Golpe não encontrado' });
    }

    const golpe = golpes[0]; // Pega o primeiro item da lista

    // Busca a categoria correspondente
    const [categorias] = await bd.query(`
      SELECT nome 
      FROM categorias 
      WHERE id = ?
    `, [golpe.categoria_id]);

    if (!categorias || categorias.length === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    // Adiciona a categoria ao golpe
    golpe.categoria = categorias[0].nome;

    res.json(golpe);
  } catch (error) {
    console.error('Erro ao buscar o golpe:', error);
    res.status(500).json({ error: 'Erro ao buscar o golpe' });
  }
});



// Rota para exibir os detalhes de uma denúncia
app.get('/api/denuncias/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [denuncia] = await bd.query('SELECT * FROM Golpes WHERE id = ?', [id]);

    if (!denuncia) {
      return res.status(404).json({ error: 'Denúncia não encontrada' });
    }

    res.status(200).json(denuncia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para retornar as categorias
app.get('/categorias', (req, res) => {
  const filePath = path.join(__dirname, 'categorias.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao ler categorias' });
    }

    try {
      const categorias = JSON.parse(data);
      res.status(200).json(categorias);
    } catch (parseError) {
      return res.status(500).json({ message: 'Erro ao parsear o arquivo de categorias' });
    }
  });
});

// Endpoint para registrar uma denúncia
app.post('/denunciar', async (req, res) => {
  const { titulo, tipo, categoria, texto } = req.body;
  
  const data = new Date().toISOString().split('T')[0];
  const usuario = 1; // ID fixo de usuário (exemplo)

  try {
    const categoriaExistente = await bd.query('SELECT id FROM categorias WHERE id = ?', [categoria]);

    if (categoriaExistente.length === 0) {
      return res.status(500).json({ msg: 'Categoria não encontrada' });
    }

    // Remove as tags HTML do texto antes de salvar no banco
    const textoLimpo = removeHtmlTags(texto);

    await bd.query(
      `INSERT INTO Golpes (titulo, descricao, data, usuario_id, categoria_id)
       VALUES (?, ?, ?, ?, ?)`,
      [titulo, textoLimpo, data, usuario, categoriaExistente[0].id]
    );
    
    res.status(200).json({ msg: 'Denúncia registrada com sucesso!' });
  } catch (err) {
    console.error('Erro ao registrar a denúncia:', err);  // Log do erro
    res.status(500).json({ msg: 'Erro ao registrar a denúncia' });
  }
});

// Criar um novo comentário em um tópico
app.post('/forum/:id/comments', async (req, res) => {
  const { id } = req.params; // ID do tópico (golpe)
  const { usuario_id, texto } = req.body;

  try {
    // Remove as tags HTML do texto do comentário
    const textoLimpo = removeHtmlTags(texto);

    const result = await bd.query(
      'INSERT INTO comentarios (golpe_id, usuario_id, texto, data) VALUES (?, ?, ?, NOW())',
      [id, usuario_id, textoLimpo]
    );

    const newComment = {
      golpe_id: id,
      usuario_id,
      texto: textoLimpo,
      data: new Date().toISOString(),
    };

    // Emitir o novo comentário pelo socket.io
    io.emit('new-comment', newComment);

    // Retornar resposta com sucesso
    res.status(201).json({ message: 'Comentário adicionado com sucesso', comentarioId: result.insertId });
  } catch (err) {
    console.error(err); // Para ajudar no debug
    res.status(500).json({ error: 'Erro ao adicionar comentário' });
  }
});

// Rota para exibir os comentários de um tópico
app.get('/forum/:id/comments', async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await bd.query('SELECT * FROM comentarios WHERE golpe_id = ?', [id]);

    // Retornar uma lista vazia em vez de um erro 404
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar comentários' });
  }
});

// Rota para exibir os detalhes de um tópico
app.get('/forum/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar o golpe pelo ID
    const [golpe] = await bd.query('SELECT * FROM golpes WHERE id = ?', [id]);

    // Se o golpe não for encontrado, redireciona para /forum
    if (!golpe) {
      return res.redirect('/forum');
    }

    // Caso queira incluir os posts relacionados ao golpe
    const posts = await bd.query('SELECT * FROM fposts WHERE ftopico_id = ?', [id]);
    golpe.posts = posts;

    res.status(200).json(golpe);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os detalhes do tópico' });
  }
});

// Inicialização do servidor
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
