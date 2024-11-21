import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";

export default function FraudeRedesSociais() {
    const noticia = {
        imagem: "../img/wpp.webp",
        titulo: "Fraude em Redes Sociais",
        categoria: "Engenharia Social",
        texto: `
        Golpes em redes sociais estão cada vez mais comuns. Os golpistas fingem ser amigos, familiares ou representantes de empresas para ganhar a confiança da vítima e solicitar transferências ou informações sigilosas.
    
        **O que é Fraude em Redes Sociais?**  
        Fraude em redes sociais refere-se a ações maliciosas realizadas por golpistas que usam plataformas como WhatsApp, Instagram, Facebook e outras para enganar as vítimas. Esses golpes geralmente têm como objetivo roubar dinheiro, informações pessoais ou até mesmo acessar contas da vítima.
    
        **Como Funciona?**  
        A fraude em redes sociais geralmente acontece em três etapas principais:  
        1. **Contato Inicial:** Os golpistas entram em contato com a vítima se passando por um conhecido ou empresa confiável.  
        2. **Construção de Confiança:** Eles criam um contexto de urgência ou necessidade, simulando emergências ou oportunidades irresistíveis.  
        3. **Solicitação de Ação:** Após ganhar a confiança da vítima, os golpistas solicitam transferências bancárias, códigos de verificação ou outros dados sensíveis.
    
        **Principais Tipos de Golpes em Redes Sociais**  
        - **Clonagem de Contas:** Criminosos criam perfis falsos ou acessam contas reais para enganar os contatos da vítima.  
        - **Golpes de Pix:** Usam mensagens falsas para solicitar transferências instantâneas.  
        - **Promoções Falsas:** Ofertas irreais de prêmios ou descontos para coletar informações pessoais ou dados financeiros.  
        - **Sequestro Digital:** Golpistas bloqueiam o acesso à conta da vítima até que um resgate seja pago.
    
        **Como se Proteger?**  
        1. Não compartilhe códigos de verificação ou senhas.  
        2. Desconfie de mensagens que pedem transferências imediatas.  
        3. Verifique o perfil de quem entrou em contato.  
        4. Ative autenticação de dois fatores em suas contas.  
        5. Use senhas fortes e evite repeti-las em diferentes plataformas.
    
        **Conclusão**  
        Golpes em redes sociais são uma ameaça crescente, mas a conscientização e medidas de segurança podem ajudar a evitar que você se torne uma vítima.`
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
                    <h2 className="font-bold">O que é Fraude em Redes Sociais?</h2>
                    <p>{noticia.texto.split('**O que é Fraude em Redes Sociais?**')[1].split('**Como Funciona?**')[0]}</p>
                    <br />
                    <h2 className="font-bold">Como Funciona?</h2>
                    <p>{noticia.texto.split('**Como Funciona?**')[1].split('**Principais Tipos de Golpes em Redes Sociais**')[0]}</p>
                    <br />
                    <h3 className="font-bold">1. Contato Inicial</h3>
                    <p>
                        Os golpistas entram em contato com a vítima, geralmente usando uma conta falsa ou clonada, se passando por alguém confiável. O objetivo inicial é parecer legítimo e conquistar a atenção da vítima.
                    </p>
                    <h3 className="font-bold">2. Construção de Confiança</h3>
                    <p>
                        Após estabelecer contato, os criminosos criam um cenário convincente, como emergências familiares ou oportunidades exclusivas, para manipular emocionalmente a vítima.
                    </p>
                    <h3 className="font-bold">3. Solicitação de Ação</h3>
                    <p>
                        Neste ponto, os golpistas pedem transferências de dinheiro, códigos de verificação ou outras informações sensíveis. A urgência falsa é usada para evitar que a vítima pense antes de agir.
                    </p>
                    <br />
                    <h2 className="font-bold">Principais Tipos de Golpes em Redes Sociais</h2>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>Clonagem de Contas:</strong> Golpistas criam perfis falsos ou acessam contas verdadeiras para enganar contatos da vítima.
                        </li>
                        <li>
                            <strong>Golpes de Pix:</strong> Mensagens falsas solicitam transferências instantâneas para contas controladas pelos criminosos.
                        </li>
                        <li>
                            <strong>Promoções Falsas:</strong> Ofertas tentadoras usadas para coletar informações ou induzir pagamentos.
                        </li>
                        <li>
                            <strong>Sequestro Digital:</strong> Contas das vítimas são bloqueadas até que um pagamento seja realizado.
                        </li>
                    </ul>
                    <br />
                    <h2 className="font-bold">Como se Proteger?</h2>
                    <ol className="list-decimal pl-5">
                        <li>Não compartilhe códigos de verificação ou senhas.</li>
                        <li>Desconfie de mensagens que pedem transferências imediatas.</li>
                        <li>Verifique o perfil de quem entrou em contato.</li>
                        <li>Ative autenticação de dois fatores em suas contas.</li>
                        <li>Use senhas fortes e evite repeti-las em diferentes plataformas.</li>
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