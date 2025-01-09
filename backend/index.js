const express = require('express');
const cors = require('cors');
const bd = require('./bd');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Configuração do `multer` para armazenar imagens na pasta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Configura a pasta 'uploads' para ser acessível publicamente via URL
app.use('/uploads', express.static('uploads'));

// Rotas
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Endpoint para obter todos os golpes
app.get('/golpes', async (req, res) => {
  try {
    const golpes = await bd.query('SELECT * FROM Golpes');
    res.json(golpes);  // Retorna todos os golpes
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os golpes" });
  }
});

// Endpoint para obter dados de um golpe específico (com id)
app.get('/golpes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [golpe] = await bd.query('SELECT * FROM Golpes WHERE id = ?', [id]);
    if (!golpe) return res.status(404).json({ error: "Golpe não encontrado" });
    res.json(golpe);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o golpe" });
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
    
    const categorias = JSON.parse(data);
    res.status(200).json(categorias);
  });
});

app.post('/denunciar', upload.single('imagem'), async (req, res) => {
  const { titulo, tipo, categoria, texto } = req.body; // Recebe os dados do formulário
  const imagem = req.file ? `/uploads/${req.file.filename}` : null; // Verifica se há imagem e retorna o caminho

  const data = new Date().toISOString().split('T')[0]; // Formato de data (YYYY-MM-DD)
  const status = "Em análise"; // Status inicial da denúncia
  const usuario = 1; // Usar o ID do usuário que fez a denúncia (exemplo está com id = 1)
  const contatos = 1; // Relacionar com algum contato do sistema

  try {
    // Verifica se a categoria existe
    const categoriaExistente = await bd.query('SELECT id FROM categorias WHERE id = ?', [categoria]);
    if (categoriaExistente.length === 0) {
      return res.status(500).json({ msg: 'Categoria não encontrada' });
    }

    // Insere a denúncia na tabela 'Golpes'
    let denuncia = await bd.query(
      `INSERT INTO Golpes
      (titulo, descricao, metodo, data, status, usuario_id, categoria_id, imagem)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [titulo, texto, tipo, data, status, usuario, categoriaExistente[0].id, imagem]
    );

    // Retorno de sucesso
    res.status(200).json({ msg: "Denúncia registrada com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Erro ao registrar a denúncia" });
  }
});

app.post('/golpes', upload.single('imagem'), async (req, res) => {
  const { titulo, descricao, metodo, data, status, usuario_id, categoria_id } = req.body;
  const imagem = req.file ? req.file.filename : null;

  try {
    // Insert into golpes table
    await bd.query(
      'INSERT INTO Golpes (titulo, descricao, metodo, data, status, usuario_id, categoria_id, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [titulo, descricao, metodo, data, status, usuario_id, categoria_id, imagem]
    );

    res.status(201).json({ message: 'Golpe created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint para obter os tópicos do fórum
app.get('/forum', async (req, res) => {
  try {
    const topicos = await bd.query('SELECT * FROM ftopicos');
    for (let topico of topicos) {
      // Buscar os comentários relacionados a esse tópico
      topico.comentarios = await bd.query('SELECT * FROM fposts WHERE golpes_id = ?', [topico.id]);
    }
    res.json(topicos);
  } catch (error) {
    res.status(500).send('Erro ao carregar tópicos');
  }
});

// Endpoint para obter um tópico específico
app.get('/forum/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [topico] = await bd.query(`
      SELECT f.id, f.titulo, f.texto, f.data, c.nome AS categoria 
      FROM ftopicos f
      JOIN categorias c ON f.categoria_id = c.id
      WHERE f.id = ?`, [id]);
    if (!topico) return res.status(404).json({ error: "Tópico não encontrado" });
    res.json(topico);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o tópico" });
  }
});

// Endpoint para criar um post
app.post('/forum/:id/posts', upload.single('imagem'), async (req, res) => {
  const { id } = req.params;
  const { usuario_id, texto } = req.body;
  const imagem = req.file ? req.file.filename : null; // Se houver imagem, pega o nome do arquivo

  try {
    await bd.query(`
      INSERT INTO fposts (ftopico_id, usuario_id, texto, imagens, data)
      VALUES (?, ?, ?, ?, NOW())`, [id, usuario_id, texto, imagem]);

    res.status(201).json({ message: "Post criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar o post" });
  }
});

// Criar um novo comentário em um tópico
app.post('/forum/:id/comentario', async (req, res) => {
  const { id } = req.params;
  const { usuario_id, texto, imagens } = req.body;
  try {
    const result = await bd.query(
      'INSERT INTO fposts (ftopico_id, usuario_id, texto, imagens, data) VALUES (?, ?, ?, ?, NOW())',
      [id, usuario_id, texto, imagens]
    );
    res.status(201).json({ message: 'Comentário adicionado com sucesso', comentarioId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao adicionar comentário' });
  }
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
