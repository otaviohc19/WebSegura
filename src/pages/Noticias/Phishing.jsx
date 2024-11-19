import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";

export default function Phishing() {
    const noticia = {
        imagem: "../img/phishing.jpg",
        titulo: "Phishing: Como os Golpistas Roubaram Suas Informações e Como se Proteger",
        categoria: "Golpes Digitais",
        texto: `
        O phishing é uma das táticas de fraude digital mais antigas e, ao mesmo tempo, uma das mais eficazes usadas por criminosos para roubar informações pessoais. Seu objetivo é enganar as vítimas e fazer com que elas revelem dados sensíveis, como senhas, números de cartão de crédito, informações bancárias e até mesmo dados de identificação pessoal. O phishing pode ser realizado de várias formas, principalmente por meio de e-mails, mensagens de texto e até redes sociais.

        **O que é o Phishing?**
        Phishing é uma técnica de engenharia social na qual o golpista se passa por uma fonte confiável para atrair a vítima e induzi-la a fornecer informações pessoais. O termo "phishing" vem de "fishing" (pesca, em inglês), pois o golpista está "fisgando" a vítima com iscas digitais, como links falsos ou arquivos anexados.

        **Como Funciona o Phishing?**
        O phishing normalmente acontece em três etapas principais:
        
        1. **Engano Inicial:** O criminoso envia uma mensagem que parece legítima, geralmente se fazendo passar por uma empresa, banco ou até mesmo um amigo. A mensagem pode ser um e-mail, uma mensagem de texto (SMS), ou uma notificação em redes sociais. O conteúdo da mensagem tenta gerar urgência, como um pedido para “verificar sua conta” ou “atualizar seus dados”.
        
        2. **Redirecionamento para Sites Falsos:** A mensagem contém um link que leva a um site que parece ser legítimo, mas na verdade é uma cópia falsa do site original. O objetivo do site falso é coletar as informações inseridas pela vítima, como senhas ou números de cartão de crédito.
        
        3. **Roubo de Dados e Consequências:** Quando a vítima preenche suas informações pessoais no site falso, os criminosos ganham acesso a esses dados. Com as informações roubadas, os golpistas podem cometer fraudes financeiras, realizar transações não autorizadas, ou vender os dados no mercado negro.

        **Principais Tipos de Phishing**

        - **Phishing por E-mail:** É o método mais comum, onde o golpista envia e-mails que imitam comunicações de empresas ou serviços.
        - **Spear Phishing:** Uma forma mais direcionada de phishing, onde o atacante personaliza a mensagem com base em informações específicas da vítima, tornando-a mais convincente.
        - **Phishing por SMS (Smishing):** Os criminosos enviam mensagens de texto fraudulentas, muitas vezes com links que redirecionam a vítima para um site falso.
        - **Phishing em Redes Sociais (Social Media Phishing):** Golpistas usam perfis falsos ou invadem contas de pessoas para enviar mensagens fraudulentas.
        
        **Como se Proteger do Phishing**

        1. **Desconfie de Mensagens Não Solicitadas:** Não clique em links ou forneça informações pessoais em mensagens não solicitadas.
        2. **Verifique o Endereço do Site:** Sempre verifique o URL antes de inserir suas informações.
        3. **Evite Clicar em Links Suspensos:** Passe o mouse sobre links para ver o endereço real.
        4. **Use Autenticação de Dois Fatores (2FA):** A 2FA aumenta a segurança de suas contas.
        5. **Mantenha seu Software Atualizado:** Isso ajuda a proteger contra vulnerabilidades que podem ser exploradas por golpistas.
        6. **Desconfie de Ofertas de Prêmios ou Benefícios Irresistíveis:** Se algo parece bom demais para ser verdade, provavelmente é.
        
        **Conclusão**

        O phishing continua sendo uma ameaça significativa no mundo digital, mas com a conscientização e precaução, é possível se proteger.
        `
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
                    <h2>O que é o Phishing?</h2>
                    <p>{noticia.texto.split('**O que é o Phishing?**')[1].split('**Como Funciona o Phishing?**')[0]}</p>
                    
                    <h2>Como Funciona o Phishing?</h2>
                    <p>{noticia.texto.split('**Como Funciona o Phishing?**')[1].split('**Principais Tipos de Phishing**')[0]}</p>
                    
                    <h3>1. Engano Inicial</h3>
                    <p>Explicação do engano inicial...</p>
                    <h3>2. Redirecionamento para Sites Falsos</h3>
                    <p>Explicação sobre como os sites falsos funcionam...</p>
                    <h3>3. Roubo de Dados e Consequências</h3>
                    <p>Consequências do phishing...</p>

                    <h2>Principais Tipos de Phishing</h2>
                    <ul className="list-disc pl-5">
                        <li><strong>Phishing por E-mail:</strong> Descrição...</li>
                        <li><strong>Spear Phishing:</strong> Descrição...</li>
                        <li><strong>Smishing:</strong> Descrição...</li>
                        <li><strong>Phishing em Redes Sociais:</strong> Descrição...</li>
                    </ul>

                    <h2>Como se Proteger do Phishing</h2>
                    <ol className="list-decimal pl-5">
                        <li>Desconfie de Mensagens Não Solicitadas</li>
                        <li>Verifique o Endereço do Site</li>
                        <li>Evite Clicar em Links Suspensos</li>
                        <li>Use Autenticação de Dois Fatores</li>
                        <li>Mantenha seu Software Atualizado</li>
                        <li>Desconfie de Ofertas de Prêmios ou Benefícios Irresistíveis</li>
                    </ol>
                    <h2>Conclusão</h2>
                    <p>{noticia.texto.split('**Conclusão**')[1]}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
