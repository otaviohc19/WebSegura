import { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Modal from "react-modal"; // Importe o Modal
import { useNavigate } from 'react-router-dom'; // Use useNavigate ao invés de useHistory

Modal.setAppElement('#root'); // Defina o elemento raiz para acessibilidade

export default function Forum() {
  const [golpes, setGolpes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedGolpe, setSelectedGolpe] = useState(null); // Estado para o golpe selecionado
  const navigate = useNavigate(); // Usando o hook useNavigate para redirecionamento

  useEffect(() => {
    // Busca todas as denúncias no backend
    const fetchGolpes = async () => {
      try {
        const response = await fetch("http://localhost:3000/golpes");
        const data = await response.json();
        setGolpes(data);
      } catch (error) {
        console.error("Erro ao buscar golpes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGolpes();
  }, []);

  const openModal = (golpe) => {
    setSelectedGolpe(golpe); // Definir o golpe selecionado
    setModalIsOpen(true); // Abrir o modal
  };

  const closeModal = () => {
    setModalIsOpen(false); // Fechar o modal
    setSelectedGolpe(null); // Limpar o golpe selecionado
  };

  const goToTopicDetails = (golpeId) => {
    // Verifica se golpeId não é undefined ou null
    if (golpeId) {
      navigate(`/forum/${golpeId}`);
    } else {
      console.error("Golpe ID não encontrado");
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <Menu />
      <MenuLateral />
      <div className="flex-1 overflow-y-auto">
        <div className="flex-1 p-8 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Fórum de Denúncias</h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            Aqui você pode ver e interagir com denúncias feitas por outros usuários.
          </p>

          {isLoading ? (
            <p className="text-center text-lg text-gray-600">Carregando denúncias...</p>
          ) : golpes.length === 0 ? (
            <p className="text-center text-lg text-gray-600">Nenhuma denúncia encontrada.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {golpes.map((golpe) => (
                <div
                  key={golpe.id}
                  className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
                >
                  <h2 className="text-xl font-bold text-gray-800">{golpe.titulo}</h2>
                  <p className="text-sm text-gray-600 mt-2">Descrição: {golpe.descricao}</p>
                  <p className="text-sm text-gray-600 mt-1">Data: {new Date(golpe.data).toLocaleDateString()}</p>
                  <button
                    onClick={() => openModal(golpe)}
                    className="mt-4 inline-block text-blue-600 hover:underline"
                  >
                    Ver detalhes
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalhes */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalhes do Golpe"
        className="modal"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        shouldCloseOnOverlayClick={true} // Permitir fechar o modal ao clicar na sobreposição
        shouldCloseOnEsc={true} // Permitir fechar o modal com a tecla ESC
      >
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          {/* X no canto superior direito */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold text-gray-800">Detalhes do Golpe</h2>
          {selectedGolpe && (
            <div className="mt-4">
              <p><strong>Título:</strong> {selectedGolpe.titulo}</p>
              <p><strong>Descrição:</strong> {selectedGolpe.descricao}</p>
              <button
                onClick={() => goToTopicDetails(selectedGolpe.id)}
                className="mt-4 text-blue-600 hover:underline"
              >
                Ver mais detalhes e interagir
              </button>
            </div>
          )}
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
