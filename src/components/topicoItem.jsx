import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import TopicoDetails from '../pages/Forum/TopicoDetails';

Modal.setAppElement('#root'); // Defina o elemento raiz para acessibilidade

export default function TopicoItem({ topico }) {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">{topico.titulo}</h2>
            <p className="text-md text-gray-600 mt-2">{topico.texto}</p>
            <div className="mt-4">
                <span className="text-sm text-gray-500">Categoria: {topico.categoria}</span>
                <span className="ml-4 text-sm text-gray-500">Data: {new Date(topico.data).toLocaleString()}</span>
            </div>
            <div className="mt-6">
                {/* Exibindo as respostas, se houver */}
                <h3 className="font-semibold text-gray-800">Respostas:</h3>
                {topico.respostas && topico.respostas.length > 0 ? (
                    topico.respostas.map((resposta) => (
                        <div key={resposta.id} className="mt-4 p-4 border-t border-gray-200">
                            <p className="text-md text-gray-700">{resposta.texto}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Sem respostas ainda.</p>
                )}
            </div>
            <button
                onClick={openModal}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Ver Detalhes
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Detalhes do Tópico"
                className="modal"
                overlayClassName="overlay"
            >
                <button onClick={closeModal} className="close-button">Fechar</button>
                <TopicoDetails id={topico.id} />
            </Modal>
        </div>
    );
}
