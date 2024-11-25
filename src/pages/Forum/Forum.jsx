import { useState, useEffect } from "react";
import Footer from "../../components/footer";
import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";

export default function Forum() {
  const [golpes, setGolpes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
                  <p className="text-sm text-gray-600 mt-2">Categoria: {golpe.categoria}</p>
                  <p className="text-sm text-gray-600 mt-1">Tipo: {golpe.metodo}</p>
                  <p className="text-sm text-gray-600 mt-1">Status: {golpe.status}</p>
                  <p className="text-sm text-gray-600 mt-1">Data: {new Date(golpe.data).toLocaleDateString()}</p>
                  {golpe.imagem && (
                    <img
                      src={`http://localhost:3000${golpe.imagem}`}
                      alt="Imagem do Golpe"
                      className="mt-4 rounded-md"
                    />
                  )}
                  <a
                    href={`/forum/${golpe.id}`}
                    className="mt-4 inline-block text-blue-600 hover:underline"
                  >
                    Ver detalhes
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
