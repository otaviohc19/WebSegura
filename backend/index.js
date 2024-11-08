const express = require('express');
const cors = require('cors');
const bd = require('./bd');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Passo 1.3: Configuração do `multer` para armazenar imagens na pasta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Define a pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Define um nome único para a imagem com a extensão original
    },
});
const upload = multer({ storage: storage });

// Configura a pasta 'uploads' para ser acessível publicamente via URL
app.use('/uploads', express.static('uploads'));

// Rotas
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.get('/golpes/categoria/:categoria', async (req, res) => {
    const { categoria } = req.params;
    try {
        // Buscar o ID da categoria
        const [categoriaId] = await bd.query('SELECT id FROM categorias WHERE nome = ?', [categoria]);
        if (!categoriaId) {
            return res.status(404).json({ msg: 'Categoria não encontrada' });
        }

        // Buscar todos os golpes dessa categoria
        const listaGolpes = await bd.query('SELECT * FROM Golpes WHERE categoria_id = ?', [categoriaId.id]);
        return res.status(200).json(listaGolpes);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Erro ao obter os golpes da categoria' });
    }
});

// Rota para visualizar um golpe específico
app.get('/golpes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [golpe] = await bd.query('SELECT * FROM Golpes WHERE id = ?', [id]);
        if (!golpe) {
            return res.status(404).json({ msg: 'Golpe não encontrado' });
        }
        return res.status(200).json(golpe);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Erro ao obter o golpe' });
    }
});

// Rota para obter todos os tópicos
app.get('/forum', async (req, res) => {
    try {
      const [results] = await bd.query('SELECT * FROM topicos ORDER BY criado_em DESC');
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensagem: 'Erro ao carregar os tópicos' });
    }
  });
  
  // Rota para obter detalhes de um tópico específico e suas respostas
  app.get('/forum/:id', async (req, res) => {
    const topicoId = req.params.id;
  
    try {
      const [topicoResult] = await bd.query('SELECT * FROM topicos WHERE id = ?', [topicoId]);
      const [respostasResult] = await bd.query('SELECT * FROM respostas WHERE topico_id = ? ORDER BY criado_em DESC', [topicoId]);
  
      res.json({
        topico: topicoResult[0],
        respostas: respostasResult
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensagem: 'Erro ao carregar o tópico ou respostas' });
    }
  });
  
  // Rota para criar um novo tópico
  app.post('/forum', async (req, res) => {
    const { titulo, conteudo, usuario_id } = req.body;
  
    try {
      await bd.query('INSERT INTO topicos (titulo, conteudo, usuario_id) VALUES (?, ?, ?)', [titulo, conteudo, usuario_id]);
      res.status(201).json({ mensagem: 'Tópico criado com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensagem: 'Erro ao criar o tópico' });
    }
  });
  
  // Rota para responder a um tópico
  app.post('/forum/:id/resposta', async (req, res) => {
    const topicoId = req.params.id;
    const { conteudo, usuario_id } = req.body;
  
    try {
      await bd.query('INSERT INTO respostas (topico_id, conteudo, usuario_id) VALUES (?, ?, ?)', [topicoId, conteudo, usuario_id]);
      res.status(201).json({ mensagem: 'Resposta enviada com sucesso' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ mensagem: 'Erro ao enviar a resposta' });
    }
  });

app.get('/categoria/:nome', async (req, res) => {
    const { nome } = req.params;
    try {
        const result = await bd.query('SELECT id FROM categorias WHERE nome = ?', [nome]);
        if (result.length > 0) {
            res.json({ id: result[0].id });
        } else {
            res.status(404).json({ error: 'Categoria não encontrada' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro ao buscar categoria" });
    }
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
        const categoriaExistente = await bd.query('SELECT id FROM categorias WHERE nome = ?', [categoria]);
        if (categoriaExistente.length === 0) {
            return res.status(404).json({ msg: 'Categoria não encontrada' });
        }

        // Insere a denúncia no fórum
        let denuncia = await bd.query(
            `INSERT INTO Golpes
            (Titulo_golpes, Conteudo_golpes, Descricao_golpes, Metodo_golpes, URL_golpes, Data_golpes, Status_golpes, usuario_id, categoria_id, contato_id, imagem)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [titulo, texto, texto, tipo, url, data, status, usuario, categoriaExistente[0].id, contatos, imagem]
        );
        res.status(200).json({ msg: "Denúncia registrada no fórum com sucesso!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro ao registrar a denúncia" });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
