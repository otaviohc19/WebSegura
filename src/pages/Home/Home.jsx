import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";

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
        }
    ];

    return (
        <div className="flex flex-col">
            <Menu />
            <MenuLateral />

            <div className="p-12 w-full max-w-5xl ml-14"> {/* Define margem para o menu lateral */}
                <h1 className="font-bold text-xl">Bem-vindo à Web Segura!</h1>
                <h2 className="pb-4 font-bold text-xl">Leia mais:</h2>

                <div className="space-y-6"> {/* Cria espaçamento entre as notícias */}
                    {noticias.map(noticia => (
                        <div key={noticia.id} className="border p-4 rounded-lg shadow-lg">
                            <img src={noticia.imagem} alt={noticia.titulo} className="w-full h-72 object-cover mb-4 rounded" />
                            <h3 className="font-bold text-lg">{noticia.titulo}</h3>
                            <p className="text-gray-600 mb-2">{noticia.categoria}</p>
                            <p>{noticia.texto}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
