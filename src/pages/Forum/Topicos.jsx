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

    useEffect(() => {
        axios.get(`/forum/${id}`)
            .then((response) => setTopico(response.data))
            .catch((error) => console.error(error));

        axios.get(`/forum/${id}/posts`)
            .then((response) => setPosts(response.data))
            .catch((error) => console.error(error));
    }, [id]);

    const handlePost = () => {
        axios.post(`/forum/${id}/posts`, { usuario_id: 1, texto }) // Simulação de usuário
            .then(() => {
                setTexto('');
                axios.get(`/forum/${id}/posts`).then((response) => setPosts(response.data));
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
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <p>{post.texto}</p>
                </div>
            ))}
            <textarea value={texto} onChange={(e) => setTexto(e.target.value)} className="w-full p-2 border rounded mt-4" />
            <button onClick={handlePost} className="bg-blue-500 text-white py-2 px-4 mt-2 rounded">
                Comentar
            </button>
            <Footer />
        </div>
    );
}
