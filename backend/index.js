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
    const [golpe] = await bd.query('SELECT * FROM Golpes WHERE id = ?', [id]);
    if (!golpe) return res.status(404).json({ error: 'Golpe não encontrado' });
    res.json(golpe);
  } catch (error) {
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
  
  console.log('Dados recebidos:', { titulo, tipo, categoria, texto });  // Log de depuração

  const data = new Date().toISOString().split('T')[0];
  const status = "Em análise";
  const usuario = 1; // ID fixo de usuário (exemplo)
  const contatos = 1; // Relacionar com algum contato do sistema

  try {
    const categoriaExistente = await bd.query('SELECT id FROM categorias WHERE id = ?', [categoria]);
    console.log('Categoria encontrada:', categoriaExistente);  // Log de depuração

    if (categoriaExistente.length === 0) {
      return res.status(500).json({ msg: 'Categoria não encontrada' });
    }

    await bd.query(
      `INSERT INTO Golpes (titulo, descricao, metodo, data, status, usuario_id, categoria_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [titulo, texto, tipo, data, status, usuario, categoriaExistente[0].id]
    );
    
    res.status(200).json({ msg: 'Denúncia registrada com sucesso!' });
  } catch (err) {
    console.error('Erro ao registrar a denúncia:', err);  // Log do erro
    res.status(500).json({ msg: 'Erro ao registrar a denúncia' });
  }
});

// Criar um novo comentário em um tópico
app.post('/forum/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { usuario_id, texto } = req.body;

  try {
    const result = await bd.query(
      'INSERT INTO fposts (ftopico_id, usuario_id, texto, data) VALUES (?, ?, ?, NOW())',
      [id, usuario_id, texto]
    );

    const newComment = {
      id: result.insertId,
      ftopico_id: id,
      usuario_id,
      texto,
      data: new Date().toISOString(),
    };

    io.emit('new-comment', newComment);

    res.status(201).json({ message: 'Comentário adicionado com sucesso', comentarioId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar comentário' });
  }
});

// Rota para exibir os comentários de um tópico
app.get('/forum/:id/comments', async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await bd.query('SELECT * FROM fposts WHERE ftopico_id = ?', [id]);

    if (comments.length === 0) {
      return res.status(404).json({ error: 'Nenhum comentário encontrado' });
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar comentários' });
  }
});

// Endpoint para exibir os detalhes do tópico do fórum
app.get('/forum/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [topico] = await bd.query('SELECT * FROM ftopicos WHERE id = ?', [id]);
    if (!topico) {
      return res.status(404).json({ error: 'Tópico não encontrado' });
    }

    const posts = await bd.query('SELECT * FROM fposts WHERE ftopico_id = ?', [id]);
    topico.posts = posts;

    res.status(200).json(topico);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os detalhes do tópico' });
  }
});

// Inicialização do servidor
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
