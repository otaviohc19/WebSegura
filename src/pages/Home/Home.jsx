import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";
import { Link } from 'react-router-dom';

export default function Home() {
    const noticias = [
        {
            id: 1,
            imagem: "../img/phishing.jpg",
            titulo: "Entenda o Phishing e Como Evitar",
            categoria: "Golpes Digitais",
            texto: "O phishing é um dos métodos mais usados por criminosos para roubar informações. Esse golpe normalmente ocorre via e-mail, mensagens de texto, ou até mesmo redes sociais, e leva o usuário a acessar sites falsos ou compartilhar informações sigilosas."
        },
        {
            id: 2,
            imagem: "../img/img4.jpg",
            titulo: "Golpes Bancários: Proteja-se!",
            categoria: "Golpes Bancários",
            texto: "Golpistas bancários utilizam diversos métodos, como ligações ou mensagens falsas, para extrair informações financeiras das vítimas. É crucial verificar a autenticidade de todas as comunicações e nunca compartilhar dados pessoais."
        },
        {
            id: 3,
            imagem: "../img/wpp.webp",
            titulo: "Fraude em Redes Sociais",
            categoria: "Engenharia Social",
            texto: "Golpes em redes sociais estão cada vez mais comuns. Os golpistas fingem ser amigos, familiares ou representantes de empresas para ganhar a confiança da vítima e solicitar transferências ou informações sigilosas."
        },
        {
            id: 4,
            imagem: "../img/redes.webp",
            titulo: "Sites Falsos de Compras Online",
            categoria: "Golpes de E-commerce",
            texto: "Sites falsos se passam por plataformas de compras legítimas, oferecendo produtos a preços muito baixos para atrair usuários. Antes de comprar online, verifique sempre a URL e procure informações sobre a reputação do site."
        },
        {
            id: 5,
            imagem: "../img/img1.jpg",
            titulo: "Clonagem de Cartões: Como se Proteger",
            categoria: "Golpes Financeiros",
            texto: "A clonagem de cartões ocorre quando golpistas obtêm os dados do seu cartão de crédito ou débito para realizar transações não autorizadas. Proteja-se usando apenas sites confiáveis para compras online e ativando notificações de transações no aplicativo do seu banco."
        },
        {
            id: 6,
            imagem: "../img/trojan.png",
            titulo: "Vírus Trojan: O Cavalo de Troia Digital",
            categoria: "Malware",
            texto: "Os vírus Trojan se disfarçam como softwares legítimos ou inofensivos, mas, uma vez instalados, causam danos ao computador ou roubam dados sensíveis. Eles podem ser distribuídos por e-mails falsos, sites comprometidos ou downloads suspeitos. É essencial manter seu antivírus atualizado e evitar clicar em links desconhecidos."
        },
        {
            id: 7,
            imagem: "../img/ransonware.jpeg",
            titulo: "Ransomware: O Vírus que Faz Sequestrar Seus Dados",
            categoria: "Malware",
            texto: "O ransomware é um tipo de malware que criptografa os dados da vítima e exige um pagamento em troca da chave para desbloquear os arquivos. Esse tipo de ataque é altamente prejudicial e pode afetar tanto indivíduos quanto empresas. A prevenção inclui manter backups atualizados e evitar abrir anexos desconhecidos."
        },
        {
            id: 8,
            imagem: "../img/worm.webp",
            titulo: "Worms: Vírus que Se Propagam Sozinhos",
            categoria: "Malware",
            texto: "Os worms são vírus que se propagam automaticamente pela rede, sem a necessidade de interação humana. Eles exploram falhas de segurança em sistemas e podem causar danos significativos ao infectar múltiplos dispositivos em questão de horas. Manter os sistemas operacionais atualizados é uma das melhores maneiras de se proteger contra worms."
        }
    ];

    return (
        <div className="flex flex-col">
            <Menu />
            <MenuLateral />
            <div className="max-w-7xl mx-auto p-6">
            <div className="space-y-6">
                {noticias.map((noticia) => (
                    <Link to={`/noticia/${noticia.id}`} key={noticia.id}>
                        <div className="border p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
                            <img 
                                src={noticia.imagem} 
                                alt={noticia.titulo} 
                                className="w-full h-64 object-cover rounded-t-lg mb-4"
                            />
                            <h3 className="font-bold text-2xl mb-2">{noticia.titulo}</h3>
                            <p className="text-gray-600 text-sm mb-3">{noticia.categoria}</p>
                            <p className="text-gray-700 mb-4">{noticia.texto}</p>
                            <span className="text-blue-500 font-semibold">Leia mais...</span>
                        </div>
                    </Link>
                ))}
            </div>
            </div>
            <Footer />
        </div>
    );
}
