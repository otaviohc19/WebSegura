import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";
import MateriaMini from "../../components/materiaMini";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Forum() {
    const [golpes, setGolpes] = useState([]);

    useEffect(() => {
        getGolpesDenunciados();
    }, []);

    async function getGolpesDenunciados() {
        try {
            const resp = await axios.get("http://localhost:3000/golpes");
            setGolpes(resp.data);
        } catch (err) {
            console.error("Erro ao obter golpes denunciados:", err);
        }
    }

    return (
        <div>
            <Menu />
            <MenuLateral />

            <div className="p-12">
                <h1 className="font-bold text-xl">Fórum de Denúncias</h1>
                <h1 className="pb-4 font-bold text-xl">Golpes Denunciados:</h1>

                <div className="flex-grow">
                    {golpes.map(golpe => (
                        <MateriaMini
                            key={golpe.id}
                            imagem={golpe.imagem} // Caminho para a imagem do golpe
                            titulo={golpe.titulo}
                            categoria={golpe.categoria_id} // Exibindo o ID da categoria, ou faça outra consulta para exibir o nome
                            texto={golpe.descricao}
                        />
                    ))}
                </div>
            </div>    

            <Footer />
        </div>
    );
}
