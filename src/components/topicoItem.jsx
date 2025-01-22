import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function TopicoItem({ topico }) {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [topicoDetalhes, setTopicoDetalhes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const openModal = async () => {
    setModalIsOpen(true);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/golpes/${topico.id}`);
      if (!response.ok) throw new Error('Erro ao carregar os detalhes');
      const data = await response.json();
      setTopicoDetalhes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setTopicoDetalhes(null);
  };

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">{topico.titulo}</h2>
      <p className="text-md text-gray-600 mt-2">{topico.texto}</p>
      <div className="mt-4">
        <span className="text-sm text-gray-500">Categoria: {topico.categoria}</span>
        <span className="ml-4 text-sm text-gray-500">Data: {new Date(topico.data).toLocaleString()}</span>
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
        shouldCloseOnOverlayClick={true}
        contentLabel="Detalhes do Tópico"
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={closeModal} className="close-button">✖</button>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : loading ? (
          <p>Carregando detalhes...</p>
        ) : topicoDetalhes ? (
          <div>
            <h1>{topicoDetalhes.titulo}</h1>
            <p>{topicoDetalhes.texto}</p>
            <p>Categoria: {topicoDetalhes.categoria}</p>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
