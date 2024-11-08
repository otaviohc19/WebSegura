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
  const [categoria, setCategoria] = useState(""); // Categoria
  const [categoriaId, setCategoriaId] = useState(""); // Estado para armazenar o ID da categoria
  const [imagem, setImagem] = useState(null); // Estado para armazenar a imagem
  const [texto, setTexto] = useState(EditorState.createEmpty());
  const [isMounted, setIsMounted] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Estado para o carregamento
  const [message, setMessage] = useState(""); // Mensagem de status

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Função para lidar com o upload da imagem
  function handleImagemChange(event) {
    setImagem(event.target.files[0]);
  }

  const handleCategoriaChange = async (ev) => {
    const categoriaNome = ev.target.value;
    setCategoria(categoriaNome);
  
    if (categoriaNome) {
      try {
        // Fazer uma requisição ao backend para pegar o ID da categoria
        const response = await fetch(`/categoria/${categoriaNome}`);
        const data = await response.json();
        
        if (data.id) {
          setCategoriaId(data.id); // Armazene o ID no estado
        } else {
          console.error('Categoria não encontrada');
          setCategoriaId(""); // Limpar o ID se a categoria não for encontrada
        }
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
        setCategoriaId(""); // Limpar o ID em caso de erro
      }
    } else {
      setCategoriaId(""); // Limpar o ID se não houver categoria selecionada
    }
  };

  async function criaGolpe() {
    if (!categoriaId) {
      setMessage("Selecione uma categoria válida.");
      return;
    }

    setIsLoading(true); // Começa o carregamento
    const body = new FormData();
    body.append("titulo", titulo);
    body.append("tipo", tipo);
    body.append("categoria", categoriaId); // Enviar o ID da categoria
    body.append("texto", draftToHtml(convertToRaw(texto.getCurrentContent())));

    if (imagem) {
      body.append("imagem", imagem); // Envia a imagem
    }

    try {
      const response = await axios.post("http://localhost:3000/denunciar", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (isMounted) {
        setMessage(response.data.msg || "Denúncia feita com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao fazer a denúncia:", error);
      if (isMounted) {
        setMessage("Ocorreu um erro ao fazer a denúncia. Tente novamente.");
      }
    } finally {
      setIsLoading(false); // Fim do carregamento
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Menu do topo */}
      <Menu />
  
      {/* Conteúdo principal com rolagem interna */}
      <div className="flex flex-1 overflow-y-auto">
        <div className="flex-1 p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Faça aqui sua denúncia em nosso site!</h1>
          <p className="text-lg text-gray-600 text-center mb-8">Ela ficará exposta no fórum para que outros usuários possam interagir e se ajudarem.</p>
  
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Título do Golpe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="titulo" className="block text-lg font-medium text-gray-700">Título do Golpe</label>
                <input
                  id="titulo"
                  type="text"
                  value={titulo}
                  onChange={(ev) => setTitulo(ev.target.value)}
                  className="mt-2 block w-full border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
  
              {/* Tipo de Golpe */}
              <div>
                <label htmlFor="tipo" className="block text-lg font-medium text-gray-700">Tipo de Golpe</label>
                <input
                  id="tipo"
                  type="text"
                  value={tipo}
                  onChange={(ev) => setTipo(ev.target.value)}
                  className="mt-2 block w-full border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
            </div>
  
            {/* Categoria do Golpe */}
            <div>
              <label htmlFor="categoria" className="block text-lg font-medium text-gray-700">Categoria do Golpe</label>
              <select
                id="categoria"
                value={categoria}
                onChange={handleCategoriaChange}
                className="mt-2 block w-full border border-gray-300 rounded-md px-4 py-2"
              >
                <option value="">Selecione uma categoria</option>
                <option value="Phishing">Phishing</option>
                <option value="Roubo de Identidade">Roubo de Identidade</option>
                <option value="Fraude Financeira">Fraude Financeira</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
  
            {/* Escolher Imagem */}
            <div>
              <label htmlFor="imagem" className="block text-lg font-medium text-gray-700">Escolha uma imagem para o golpe</label>
              <input
                type="file"
                onChange={handleImagemChange}
                className="mt-2 block w-full text-sm text-gray-700"
              />
            </div>
  
            {/* Editor de Texto */}
            <div>
              <label htmlFor="texto" className="block text-lg font-medium text-gray-700">Descrição do Golpe</label>
              <Editor
                editorState={texto}
                toolbarClassName="editorDraft-toolbar"
                wrapperClassName="editorDraft-wrapper"
                editorClassName="editorDraft-editor h-48 max-h-96 overflow-auto p-4 border border-gray-300 rounded-md"
                onEditorStateChange={setTexto}
              />
            </div>
  
            {/* Mensagem de status */}
            {message && (
              <div className="text-center text-lg text-gray-800 mt-4">
                <p>{message}</p>
              </div>
            )}
  
            {/* Botão de Envio */}
            <div className="mt-5">
              <button
                onClick={criaGolpe}
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
              >
                {isLoading ? "Enviando..." : "Fazer denúncia"}
              </button>
            </div>
          </form>
        </div>
  
        {/* Menu Lateral Fixado à Direita */}
        <MenuLateral />
      </div>
  
      {/* Rodapé posicionado abaixo do conteúdo */}
      <Footer />
    </div>
  );
} 