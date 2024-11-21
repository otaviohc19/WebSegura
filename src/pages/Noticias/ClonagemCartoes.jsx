import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";

export default function ClonagemCartoes() {
    const noticia = {
        link: "clonagem-cartoes",
        imagem: "../img/img1.jpg",
        titulo: "Clonagem de Cartões: Como se Proteger",
        categoria: "Golpes Financeiros",
        texto: `
        A clonagem de cartões ocorre quando golpistas obtêm os dados do seu cartão de crédito ou débito para realizar transações não autorizadas. Proteja-se usando apenas sites confiáveis para compras online e ativando notificações de transações no aplicativo do seu banco.
    
        **O que é Clonagem de Cartões?**  
        A clonagem de cartões é um crime no qual os dados de um cartão de crédito ou débito são copiados sem o conhecimento do titular. Com esses dados, os criminosos podem realizar compras ou saques fraudulentos, causando prejuízos significativos.
    
        **Como Funciona a Clonagem de Cartões?**  
        Existem diversas maneiras que os golpistas utilizam para clonar cartões. Uma das técnicas mais comuns é o uso de dispositivos chamados "chupa-cabras", que são instalados em caixas eletrônicos ou terminais de pagamento para capturar as informações do cartão. Em seguida, eles podem utilizar esses dados para realizar transações ou até criar cópias físicas do cartão.
    
        **Principais Formas de Obter os Dados do Cartão**  
        - **Dispositivos de Captura (Chupa-Cabras):** Instalação de dispositivos em caixas eletrônicos ou maquinetas de pagamento para ler os dados do cartão.  
        - **Phishing:** Criação de sites falsos ou envio de e-mails fraudulentos para roubar as informações do cartão.  
        - **Vendas de Dados na Dark Web:** Os criminosos podem vender os dados roubados para outros golpistas ou em mercados clandestinos.
    
        **Como se Proteger da Clonagem de Cartões?**  
        1. Use apenas sites confiáveis para realizar compras online.  
        2. Ative as notificações de transações em tempo real no seu aplicativo bancário.  
        3. Prefira pagar com métodos mais seguros, como cartões virtuais ou plataformas de pagamento seguras.  
        4. Verifique sempre se o terminal de pagamento ou caixa eletrônico não possui dispositivos suspeitos.  
        5. Monitore regularmente as transações do seu cartão e entre em contato com o banco se detectar algo estranho.
    
        **Conclusão**  
        A clonagem de cartões é uma ameaça real, mas com algumas medidas preventivas, você pode proteger suas informações financeiras e evitar ser vítima desse golpe.`
    };
    

    return (
        <div className="flex flex-col">
            <Menu />
            <MenuLateral />
            <div className="p-12 max-w-4xl mx-auto">
                <img
                    src={noticia.imagem}
                    alt={noticia.titulo}
                    className="w-full h-72 object-cover mb-6 rounded"
                />
                <h1 className="text-3xl font-bold mb-4">{noticia.titulo}</h1>
                <p className="text-gray-500 mb-6">{noticia.categoria}</p>
                <div className="prose lg:prose-xl">
                    <h2 className="font-bold">O que é Clonagem de Cartões?</h2>
                    <p>{noticia.texto.split('**O que é Clonagem de Cartões?**')[1].split('**Como Funciona a Clonagem de Cartões?**')[0]}</p>
                    <br />
                    <h2 className="font-bold">Como Funciona a Clonagem de Cartões?</h2>
                    <p>{noticia.texto.split('**Como Funciona a Clonagem de Cartões?**')[1].split('**Principais Formas de Obter os Dados do Cartão**')[0]}</p>
                    <br />
                    <h3 className="font-bold">Principais Formas de Obter os Dados do Cartão</h3>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>Dispositivos de Captura (Chupa-Cabras):</strong> Instalação de dispositivos em caixas eletrônicos ou maquinetas de pagamento para capturar os dados do cartão.
                        </li>
                        <li>
                            <strong>Phishing:</strong> Criação de sites falsos ou envio de e-mails fraudulentos para roubar as informações do cartão.
                        </li>
                        <li>
                            <strong>Vendas de Dados na Dark Web:</strong> Criminosos vendem os dados roubados para outros golpistas ou em mercados clandestinos.
                        </li>
                    </ul>
                    <br />
                    <h2 className="font-bold">Como se Proteger da Clonagem de Cartões?</h2>
                    <ol className="list-decimal pl-5">
                        <li>Use apenas sites confiáveis para realizar compras online.</li>
                        <li>Ative as notificações de transações em tempo real no seu aplicativo bancário.</li>
                        <li>Prefira pagar com métodos mais seguros, como cartões virtuais ou plataformas de pagamento seguras.</li>
                        <li>Verifique sempre se o terminal de pagamento ou caixa eletrônico não possui dispositivos suspeitos.</li>
                        <li>Monitore regularmente as transações do seu cartão e entre em contato com o banco se detectar algo estranho.</li>
                    </ol>
                    <br />
                    <h2 className="font-bold">Conclusão</h2>
                    <p>{noticia.texto.split('**Conclusão**')[1]}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}    