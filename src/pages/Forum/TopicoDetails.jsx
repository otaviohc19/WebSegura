import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../../components/footer";
import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function TopicoDetails() {
  const { golpeId } = useParams();
  const [golpeDetails, setGolpeDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // Fetch golpe details
  const fetchGolpeDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/forum/${golpeId}`);
      if (!response.ok) throw new Error('Erro ao buscar detalhes do tópico');
      const data = await response.json();
      setGolpeDetails(data);
    } catch (error) {
      setError('Erro ao carregar os detalhes do tópico. Tente novamente mais tarde.');
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    setIsLoadingComments(true);
    try {
      const response = await fetch(`http://localhost:3000/forum/${golpeId}/comments`);
      if (!response.ok) throw new Error('Erro ao buscar os comentários');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      setError('Erro ao carregar os comentários. Tente novamente mais tarde.');
    } finally {
      setIsLoadingComments(false);
    }
  };

  // Handle new comment submission
  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`http://localhost:3000/forum/${golpeId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: 1, texto: newComment }),
      });
      if (!response.ok) throw new Error('Erro ao enviar o comentário');
      const createdComment = await response.json();

      setNewComment(''); // Limpa o campo de texto
    } catch (error) {
      console.error(error); // Log para debug
      setError('Erro ao enviar o comentário. Tente novamente.');
    }
  };

  useEffect(() => {
    if (golpeId) {
      fetchGolpeDetails();
      fetchComments();
    }
  }, [golpeId]);

  // Socket.io listener
  useEffect(() => {
    socket.on('new-comment', (newComment) => {
      setComments((prevComments) => {
        if (prevComments.some((comment) => comment.id === newComment.id)) {
          return prevComments;
        }
        return [...prevComments, newComment];
      });
    });

    return () => {
      socket.off('new-comment');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Menu />
      <div className="flex flex-1">
        <MenuLateral />
        <main className="w-[90%] p-4 bg-white">
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {golpeDetails ? (
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
              <h1 className="text-4xl font-bold text-blue-900 mb-4">{golpeDetails.titulo}</h1>
              <p className="text-lg mb-4">{golpeDetails.descricao}</p>

              <div>
                <h2 className="text-xl font-semibold mb-4">Comentários:</h2>
                {isLoadingComments ? (
                  <p>Carregando comentários...</p>
                ) : (
                  <>
                    {comments.length === 0 ? (
                      <p>Não há comentários ainda. Adicione o primeiro comentário abaixo:</p>
                    ) : (
                      comments.map((comment) => (
                        <div key={comment.id} className="p-4 bg-gray-100 rounded mb-4">
                          <p>{comment.texto}</p>
                          <small className="text-gray-500">
                            Postado em: {new Date(comment.data).toLocaleString()}
                          </small>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>

              <form onSubmit={handleNewCommentSubmit}>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mt-4"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Adicionar um comentário..."
                />
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Enviar
                </button>
              </form>
            </div>
          ) : (
            <p>Carregando detalhes do tópico...</p>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
