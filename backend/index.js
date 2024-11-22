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
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Configura a pasta 'uploads' para ser acessível publicamente via URL
app.use('/uploads', express.static('uploads'));

// Rotas
app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

// Endpoint para obter dados da tabela 'Golpes'
app.get('/golpes', async (req, res) => {
  try {
    const [results] = await bd.query('SELECT * FROM Golpes');
    console.log('Resultados do banco de dados:', results);
    res.json(Array.isArray(results) ? results : [results]);
  } catch (err) {
    console.error('Erro ao consultar o banco de dados:', err);
    res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
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

// Rota para registrar uma denúncia, agora vai para o fórum
app.post('/denunciar', upload.single('imagem'), async (req, res) => {
  const { titulo, tipo, categoria, texto } = req.body; // Recebe os dados do formulário
  const imagem = req.file ? `/uploads/${req.file.filename}` : null; // Verifica se há imagem e retorna o caminho

  const url = "google.com"; // Dados estáticos para o exemplo
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

    // Insere a denúncia no banco de dados
    let denuncia = await bd.query(
      `INSERT INTO Golpes
      (titulo, descricao, metodo, url, data, status, usuario_id, categoria_id, contato_id, imagem)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [titulo, texto, tipo, url, data, status, usuario, categoriaExistente[0].id, contatos, imagem]
    );

    // Insere a denúncia como tópico no fórum
    const topicoId = denuncia.insertId; // ID da denúncia inserida
    await bd.query(
      'INSERT INTO ftopicos (titulo, categoria_id, usuario_id, data) VALUES (?, ?, ?, ?)',
      [titulo, categoriaExistente[0].id, usuario, data]
    );

    res.status(200).json({ msg: "Denúncia registrada no fórum com sucesso!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Erro ao registrar a denúncia" });
  }
});

// Endpoint para obter os tópicos do fórum
app.get('/forum', async (req, res) => {
  try {
    const topicos = await bd.query('SELECT * FROM ftopicos');
    for (let topico of topicos) {
      // Buscar os comentários relacionados a esse tópico
      topico.comentarios = await bd.query('SELECT * FROM fposts WHERE ftopico_id = ?', [topico.id]);
    }
    res.json(topicos);
  } catch (error) {
    res.status(500).send('Erro ao carregar tópicos');
  }
});

// Endpoint para retornar os comentários de um tópico
app.get('/forum/:id/posts', async (req, res) => {
  const { id } = req.params;
  try {
    const [posts] = await bd.query('SELECT * FROM fposts WHERE ftopico_id = ? ORDER BY data ASC', [id]);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar posts', error });
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
