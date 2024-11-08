import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";
import MateriaMini from "../../components/materiaMini";

export default function Home() {
    // Informativos manuais sobre golpes
    const informativos = [
        {
            id: 1,
            titulo: "Golpe do falso suporte",
            descricao: "Golpistas se passando por suporte técnico para roubar dados pessoais. Saiba como se proteger!",
            imagem: "/uploads/golpe1.jpg", // Caminho para a imagem do informativo
            categoria: "Golpe de Suporte"
        },
        {
            id: 2,
            titulo: "Fraude por phishing",
            descricao: "E-mails fraudulentos solicitando informações pessoais. Veja como reconhecer e evitar.",
            imagem: "/uploads/golpe2.jpg",
            categoria: "Golpe Bancário"
        },
        // Adicione mais informativos conforme necessário
    ];

    return (
        <div>
            <Menu />
            <MenuLateral />

            <div className="p-12">
                <h1 className="font-bold text-xl">Bem-vindo à Web Segura!</h1>
                <h1 className="pb-4 font-bold text-xl">Leia mais:</h1>

                <div className="flex-grow">
                    {informativos.map(informativo => (
                        <MateriaMini
                            key={informativo.id}
                            imagem={informativo.imagem}
                            titulo={informativo.titulo}
                            categoria={informativo.categoria}
                            texto={informativo.descricao}
                        />
                    ))}
                </div>
            </div>    

            <Footer />
        </div>
    );
}
