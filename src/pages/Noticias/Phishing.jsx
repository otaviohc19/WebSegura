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
                    <h2 className="font-bold">O que é o Phishing?</h2>
                    <p>
                        O phishing é uma técnica de ataque cibernético em que criminosos enganam as vítimas para obter informações confidenciais, como senhas, números de cartão de crédito ou dados pessoais. Eles se passam por entidades confiáveis, como bancos ou empresas, e utilizam comunicações fraudulentas para induzir a vítima a compartilhar essas informações.
                    </p>
                    <br />
                    <h2 className="font-bold">Como Funciona o Phishing?</h2>
                    <p>
                        O phishing funciona explorando a confiança ou a falta de atenção das vítimas. O criminoso cria um cenário falso, como um e-mail de um banco solicitando a atualização de dados, e redireciona a vítima para um site falso que se parece com o original. Ao inserir as informações no site, a vítima entrega seus dados aos golpistas.
                    </p>
                    
                    <h3 className="font-bold">1. Engano Inicial</h3>
                    <p>
                        Os golpistas enviam mensagens que parecem legítimas, como e-mails ou SMS, contendo alertas urgentes ou promoções irresistíveis. O objetivo é atrair a atenção da vítima e incentivá-la a agir rapidamente, sem perceber os sinais de fraude.
                    </p>
                    <h3 className="font-bold">2. Redirecionamento para Sites Falsos</h3>
                    <p>
                        As mensagens geralmente contêm links que redirecionam a vítima para sites falsos. Esses sites são projetados para se parecer com plataformas confiáveis, como portais bancários ou lojas online, enganando a vítima para que insira suas informações.
                    </p>
                    <h3 className="font-bold">3. Roubo de Dados e Consequências</h3>
                    <p>
                        Assim que a vítima insere os dados no site falso, os golpistas têm acesso às informações. Isso pode resultar em roubo de identidade, transações financeiras fraudulentas e outros prejuízos significativos.
                    </p>
                    <br />
                    <h2 className="font-bold">Principais Tipos de Phishing</h2>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>Phishing por E-mail:</strong> Envolve o envio de e-mails que parecem vir de fontes confiáveis, contendo links ou anexos maliciosos.
                        </li>
                        <li>
                            <strong>Spear Phishing:</strong> Ataques direcionados a indivíduos ou empresas específicas, geralmente com informações personalizadas para parecer mais convincentes.
                        </li>
                        <li>
                            <strong>Smishing:</strong> Golpes realizados por SMS, onde os golpistas enviam mensagens com links para sites falsos ou números de telefone fraudulentos.
                        </li>
                        <li>
                            <strong>Phishing em Redes Sociais:</strong> Os criminosos criam perfis falsos ou enviam mensagens diretas para enganar as vítimas.
                        </li>
                    </ul>
                    <br />
                    <h2 className="font-bold">Como se Proteger do Phishing</h2>
                    <ol className="list-decimal pl-5">
                        <li>Desconfie de Mensagens Não Solicitadas</li>
                        <li>Verifique o Endereço do Site</li>
                        <li>Evite Clicar em Links Suspensos</li>
                        <li>Use Autenticação de Dois Fatores</li>
                        <li>Mantenha seu Software Atualizado</li>
                        <li>Desconfie de Ofertas de Prêmios ou Benefícios Irresistíveis</li>
                    </ol>
                    <br />
                    <h2 className="font-bold">Conclusão</h2>
                    <p>
                        O phishing continua sendo uma ameaça significativa no mundo digital. Proteger-se requer atenção, ferramentas de segurança atualizadas e boas práticas ao interagir com mensagens e sites online. Ao reconhecer os sinais de phishing, você pode evitar ser uma vítima desse tipo de golpe.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}    