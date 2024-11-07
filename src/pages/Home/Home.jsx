import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";
import MateriaMini from "../../components/materiaMini";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [golpes, setGolpes] = useState([]);

    useEffect(() => {
        getGolpes();
    }, []);

    async function getGolpes(){
        const resp = await axios.get("http://localhost:3000/golpes");
        setGolpes(resp.data);
    }

    return (
        <div>
            <Menu />
            <MenuLateral />

            <div className="p-12">
                <h1 className="font-bold text-xl">Bem-vindo à Web Segura!</h1>
                <h1 className="pb-4 font-bold text-xl">Leia mais:</h1>

                <div className="flex-grow">
					{golpes.map(golpe => (
						<MateriaMini
							key={"golpe_" + golpe.idGolpes}
							imagem={golpe.imagem}
							titulo={golpe.Titulo_golpes}
							categoria={golpe.categoria}
							texto={golpe.Descricao_golpes}
						/>
					))}
                </div>
            </div>    

            <Footer />
        </div>
    )
}
