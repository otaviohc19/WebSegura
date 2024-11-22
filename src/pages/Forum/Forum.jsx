import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../../components/menu';
import MenuLateral from '../../components/menuLateral';
import Footer from '../../components/footer';
import TopicoItem from '../../components/topicoItem';

export default function Forum() {
    const [topicos, setTopicos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/golpes') // Certifique-se de que a URL esteja correta
            .then((response) => {
                // Filtrando os tópicos para garantir que são válidos
                setTopicos(Array.isArray(response.data) ? response.data : [response.data]);
            })
            .catch((error) => {
                console.error('Erro ao buscar tópicos:', error);
            });
    }, []);

    return (
        <div className="forum">
            <Menu />
            <MenuLateral />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8">Fórum de Golpes</h1>
                {topicos.length === 0 ? (
                    <p className="text-center text-lg text-gray-600">Não há golpes registrados no fórum.</p>
                ) : (
                    <div className="space-y-6">
                        {topicos.map((topico) => (
                            <TopicoItem key={topico.id} topico={topico} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
