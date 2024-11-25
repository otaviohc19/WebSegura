import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from '../../components/menu';
import MenuLateral from '../../components/menuLateral';
import Footer from '../../components/footer';

export default function Topico() {
    const { id } = useParams();
    const [topico, setTopico] = useState(null);
    const [posts, setPosts] = useState([]);
    const [texto, setTexto] = useState('');
    const [imagem, setImagem] = useState(null); // Estado para armazenar a imagem

    useEffect(() => {
        // Carregar o tópico
        axios.get(`http://localhost:3000/forum/${id}`)
            .then((response) => setTopico(response.data))
            .catch((error) => console.error(error));

        // Carregar os posts
        axios.get(`http://localhost:3000/forum/${id}/posts`)
            .then((response) => setPosts(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    const handlePost = () => {
        const formData = new FormData();
        formData.append('usuario_id', 1);  // Simulação de usuário
        formData.append('texto', texto);  // Adiciona o texto ao FormData

        // Se houver imagem, adiciona ao FormData
        if (imagem) {
            formData.append('imagem', imagem);
        }

        // Envia os dados para o backend
        axios.post(`http://localhost:3000/forum/${id}/posts`, formData)
            .then(() => {
                setTexto('');  // Limpa o campo de texto após o envio
                setImagem(null);  // Limpa a imagem após o envio
                // Recarrega os posts
                axios.get(`http://localhost:3000/forum/${id}/posts`)
                    .then((response) => setPosts(response.data))
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="topico">
            <Menu />
            <MenuLateral />
            {topico && (
                <div>
                    <h1 className="text-2xl font-bold">{topico.titulo}</h1>
                    <p>Categoria: {topico.categoria}</p>
                </div>
            )}

            <h2 className="text-xl font-semibold mt-4">Comentários</h2>

            {/* Exibir posts */}
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <p>{post.texto}</p>
                    {post.imagens && (
                        <img
                            src={`http://localhost:3000/uploads/${post.imagens}`}
                            alt="Imagem do post"
                            className="w-full mt-2"
                        />
                    )}
                    <p className="text-sm text-gray-500">
                        Postado por: {post.usuario_nome} em {new Date(post.data).toLocaleString()}
                    </p>
                </div>
            ))}

            {/* Formulário para novo post */}
            <div className="mt-4">
                <textarea
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    className="w-full p-2 border rounded mt-4"
                    placeholder="Escreva seu comentário..."
                />
                <input
                    type="file"
                    onChange={(e) => setImagem(e.target.files[0])}
                    className="w-full p-2 border rounded mt-4"
                />
                <button
                    onClick={handlePost}
                    className="bg-blue-500 text-white py-2 px-4 mt-2 rounded"
                >
                    Comentar
                </button>
            </div>

            <Footer />
        </div>
    );
}
