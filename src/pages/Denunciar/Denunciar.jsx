//Denunciar.jsx

import { useState } from "react";
import Footer from "../../components/footer";
import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import axios from "axios";

export default function Denunciar() {

	const [titulo, setTitulo] = useState("");
	const [tipo, setTipo] = useState("");
	const [texto, setTexto] = useState(EditorState.createEmpty());

	async function criaGolpe() {
		const body = {
			titulo: titulo,
			tipo: tipo,
			texto: draftToHtml(convertToRaw(texto.getCurrentContent()))
		}
		await axios.post("http://localhost:3000/denunciar", body);
		alert("ok");
	}

	return(
		<div>
			<Menu />
			<MenuLateral />
			<div className="p-4 container mx-auto">
				<p>Titulo do golpe</p>
				<input className="border border-black" type="text" value={titulo} onChange={(ev) => setTitulo(ev.target.value)} />

				<p>Tipo de golpe</p>
				<input className="border border-black" type="text" value={tipo} onChange={(ev) => setTipo(ev.target.value)} />

				<Editor
  					editorState={texto}
  					toolbarClassName="editorDraft-toolbar"
  					wrapperClassName="editorDraft-wrapper"
  					editorClassName="editorDraft-editor"
  					onEditorStateChange={setTexto}
				/>

				<button onClick={criaGolpe}>Fazer a denúncia</button>

				<div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(texto.getCurrentContent()))}} />

			</div>

			<Footer />
		</div>
	);
}