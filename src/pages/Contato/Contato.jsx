import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";

export default function Contato() {
    return (
        <div className="flex flex-col min-h-screen">
            <Menu />
            <div className="flex flex-grow">
                <MenuLateral />
                <div className="flex justify-center items-center flex-grow p-12">
                    <div className="bg-white border border-gray-300 p-8 rounded-lg shadow-md max-w-md w-full text-center">
                        <h1 className="font-bold text-2xl mb-4">Entre em Contato</h1>
                        <p className="text-lg mb-4">
                            <strong>E-mail:</strong> otavio.rodrigues@estudante.iftm.edu.br
                        </p>
                        <p className="text-lg">
                            <strong>Telefone:</strong> (00) 1234-5678
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
