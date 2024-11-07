const express = require('express');
const cors = require('cors');
const bd = require('./bd');
const multer = require('multer');
const path = require('path');

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

app.get('/golpes', async (req, res) => {
    try {
        let listaGolpes = await bd.query("SELECT * FROM Golpes");
        return res.status(200).json(listaGolpes);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Erro ao obter os golpes" });
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

// Alteração na rota /denunciar para aceitar o upload de imagem
app.post('/denunciar', upload.single('imagem'), async (req, res) => {
    const { titulo, tipo, categoria, texto } = req.body;  // Recebe os dados do formulário
    const imagem = req.file ? `/uploads/${req.file.filename}` : null; // Verifica se há uma imagem e retorna o caminho

    const url = "google.com";  // Dados estáticos para o exemplo
    const data = "2024/10/28";
    const status = "em análise";
    const usuario = 1;
    const contatos = 1;

    try {
        // Verifica se a categoria existe antes de registrar a denúncia
        const categoriaExistente = await bd.query('SELECT id FROM categorias WHERE nome = ?', [categoria]);
        if (categoriaExistente.length === 0) {
            return res.status(404).json({ msg: 'Categoria não encontrada' });
        }

        // Insere a denúncia
        let denuncia = await bd.query(
            `INSERT INTO Golpes
            (Titulo_golpes, Conteudo_golpes, Descricao_golpes, Metodo_golpes, URL_golpes, Data_golpes, Status_golpes, usuario_id, categoria_id, contato_id, imagem)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [titulo, texto, texto, tipo, url, data, status, usuario, categoriaExistente[0].id, contatos, imagem]
        );
        res.status(200).json({ msg: "Denúncia registrada com sucesso!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Erro ao registrar denúncia" });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
