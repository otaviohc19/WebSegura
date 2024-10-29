import { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import axios from "axios";

export default function Denunciar() {
	const [titulo, setTitulo] = useState("");
	const [tipo, setTipo] = useState("");
	const [texto, setTexto] = useState(EditorState.createEmpty());
	const [isMounted, setIsMounted] = useState(true); // Controle de montagem

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false); // Limpa ao desmontar
	}, []);

	async function criaGolpe() {
		const body = {
			titulo: titulo,
			tipo: tipo,
			texto: draftToHtml(convertToRaw(texto.getCurrentContent()))
		};

		try {
			const response = await axios.post("http://localhost:3000/denunciar", body);
			if (isMounted) { // Verifica se o componente ainda está montado
				alert(response.data.msg || "Denúncia feita com sucesso!");
			}
		} catch (error) {
			console.error("Erro ao fazer a denúncia:", error);
			if (isMounted) { // Verifica se o componente ainda está montado
				alert("Ocorreu um erro ao fazer a denúncia. Tente novamente.");
			}
		}
	}

	return (
		<div>
			<Menu />
			<MenuLateral />

			<div className="m-auto max-w-2xl my-8">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Faça aqui sua denúncia em nosso site!</h1>
				<p className="text-lg text-gray-600">Ela ficará exposta para que os outros usuários possam ver e se precaverem.</p>
			</div>

			<div className="container mx-auto">
				<p>Título do golpe</p>
				<input
					className="border border-black"
					type="text"
					value={titulo}
					onChange={(ev) => setTitulo(ev.target.value)}
				/>

				<p>Tipo de golpe</p>
				<input
					className="border border-black"
					type="text"
					value={tipo}
					onChange={(ev) => setTipo(ev.target.value)}
				/>

				<Editor
					editorState={texto}
					toolbarClassName="editorDraft-toolbar"
					wrapperClassName="editorDraft-wrapper"
					editorClassName="editorDraft-editor"
					onEditorStateChange={setTexto}
				/>

				<div className="mt-5">
					<button onClick={criaGolpe} className="bg-white border-2 border-black p-3 rounded-md flex items-center transition duration-300 ease-in-out hover:bg-gray-100 hover:border-blue-500 hover:shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
						<i className="fas fa-user mr-2 text-black"></i> 
						Fazer denúncia
					</button>
				</div>

				<div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(texto.getCurrentContent())) }} />
			</div>

			<Footer />
		</div>
	);
}
