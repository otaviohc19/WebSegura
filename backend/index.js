const express = require('express');  
const cors = require('cors');
const bd = require('./bd'); 

const app = express();  
const port = 3000;  // Use uma porta diferente para o servidor

app.use(express.json());
app.use(cors());     

app.get('/', (req, res) => {
    res.send('Servidor funcionando')
});

app.get('/golpes', async (req, res) => {
    let listaGolpes = await bd.query("SELECT * FROM Golpes");
    return res.status(200).json(listaGolpes);
});

app.post('/denunciar', async (req, res) => {
    const {titulo, tipo, texto} = req.body;
    const url = "google.com";
    const data = "2024/10/28";
    const status = "em análise";
    const usuario = 1;
    const categoria = 1;
    const contatos = 1;

    try{
        let denuncia = await bd.query(
            `INSERT INTO Golpes
            (Titulo_golpes, Conteudo_golpes, Descricao_golpes, Metodo_golpes, URL_golpes, Data_golpes, Status_golpes, usuario_id, categoria_id, contato_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
            [titulo, texto, texto, tipo, url, data, status, usuario, categoria, contatos]
        ); 
    } catch(err){
        console.log(err);
    }

    return res.status(200).json({msg: "Sucesso"});
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`) // Mostra a nova porta
});
