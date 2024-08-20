// 1 Instalar os pacotes express, cors, nodemon
// 2 Criar o script do nodemon no package.json
// 3 Importar os pacotes e inicializá-los
// 4 Criar a Rota inicial
// 5 Iniciar a escuta do servidor em uma porta escohida

const express = require('express');  // Importando o express
const cors = require('cors');
const bd = require('./bd'); // Importando a conexão como BD

const app = express();  // Inicializando o servidor
const port = 3306;  // Porta dedicada ao servidor


// middleware
app.use(express.json());
app.use(cors());     // Liberando acesso de qualquer origem


app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})


app.get('/golpes', async (req, res) => {
    let listaGolpes = await bd.query("SELECT * FROM Golpes");

    return res.status(200).json(listaGolpes);
});


app.post('/denunciar', async (req, res) => {
	const {titulo, tipo, texto} = req.body;
	// campo de formulário pro usuário informar a url
	const url = "google.com";
	const data = "2023/11/17";
	const status = "em análise"; // eu vou informar, não vem pelo formulário
	const usuario = 1; // usuário logado
	const categoria = 1; // caixa de seleção com categorias
	const contatos = 1; // dados de contato do usuário

	try{
		let denuncia = await bd.query(
			`INSERT INTO Golpes
			(Titulo_golpes, Conteudo_golpes, Descricao_golpes, Metodo_golpes, URL_golpes, Data_golpes, Status_golpes, Usuarios_idUsuarios, Categorias_idCategorias, Contatos_idContatos)
			values
			(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
			[titulo, texto, texto, tipo, url, data, status, usuario, categoria, contatos]
		);
	} catch(err){
		console.log(err);
	}

    return res.status(200).json({msg: "Sucesso"});
});


// http://localhost:3000/pokemon/busca/pikachu
app.get('/pokemon/busca/:nome', async (req, res) => {
    let nome = req.params.nome;
    
    let poke = await bd.query(
        `SELECT * FROM pokemon WHERE nome = ?`,        // SQL
        [nome]                                         // Lista de variáveis
    );
    
    return res.status(200).json(poke);
});





// Direcionando a porta ao servidor
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});