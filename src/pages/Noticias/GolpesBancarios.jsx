import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";

export default function GolpesBancarios() {
    const noticia = {
        imagem: "../img/img4.jpg",
        titulo: "Golpes Bancários: Proteja-se",
        categoria: "Golpes Financeiros",
        texto: `
            Golpes bancários estão entre os métodos mais prejudiciais usados por criminosos para enganar as vítimas e roubar informações financeiras. Eles podem se aproveitar de falhas de segurança, descuidos ou até mesmo da confiança dos usuários, utilizando estratégias sofisticadas para acessar contas e realizar transações fraudulentas. Compreender como esses golpes funcionam é o primeiro passo para se proteger.
    
            **O que são Golpes Bancários?**
            Golpes bancários envolvem técnicas variadas para enganar indivíduos ou empresas, com o objetivo de obter acesso a contas bancárias, roubar dinheiro ou informações sensíveis. Os criminosos muitas vezes se fazem passar por representantes legítimos de instituições financeiras, utilizando canais como telefonemas, mensagens de texto ou e-mails falsos.
    
            **Como Funcionam os Golpes Bancários?**
            Os golpes bancários geralmente seguem um padrão semelhante:
            
            1. **Contato Inicial:** O golpista entra em contato se passando por uma entidade confiável, como um banco ou operadora de cartão de crédito. Isso pode ocorrer por telefone, SMS, e-mail ou aplicativos de mensagens. A abordagem frequentemente envolve urgência, como "Sua conta será bloqueada" ou "Detectamos uma transação suspeita".
            
            2. **Solicitação de Informações:** Durante o contato, o criminoso tenta obter informações confidenciais, como números de conta, senhas, códigos de autenticação ou detalhes do cartão de crédito. Em alguns casos, eles solicitam que a vítima faça transferências ou pagamentos.
            
            3. **Execução do Golpe:** Com os dados obtidos, o golpista pode acessar a conta da vítima, realizar transações não autorizadas, ou até mesmo criar novos cartões e serviços bancários em nome da pessoa lesada.
    
            **Principais Tipos de Golpes Bancários**
    
            - **Falsas Centrais de Atendimento:** O golpista liga se passando por um atendente do banco, solicitando informações sigilosas.
            - **Clonagem de Cartões:** Através de dispositivos como "chupa-cabras", os criminosos copiam os dados do cartão diretamente de caixas eletrônicos ou maquininhas de pagamento.
            - **Links Falsos por SMS ou E-mail (Phishing Bancário):** Mensagens que parecem legítimas, mas redirecionam a vítima para sites fraudulentos.
            - **Golpes com QR Codes:** Criminosos alteram QR Codes legítimos para redirecionar pagamentos para suas contas.
            - **Fraudes de Pix:** Os golpistas criam situações de emergência para que as vítimas realizem transferências via Pix.
    
            **Como se Proteger de Golpes Bancários**
    
            1. **Nunca Compartilhe Senhas ou Códigos de Segurança:** Bancos nunca solicitam esses dados por telefone ou mensagens.
            2. **Evite Clicar em Links Não Solicitados:** Sempre acesse os aplicativos ou sites oficiais do banco diretamente.
            3. **Ative Notificações de Transações:** Assim, você será alertado imediatamente sobre movimentações em sua conta.
            4. **Utilize Autenticação de Dois Fatores (2FA):** Adicione uma camada extra de segurança às suas contas.
            5. **Verifique QR Codes:** Certifique-se de que o QR Code é legítimo antes de escaneá-lo.
            6. **Atualize Regularmente Seus Dispositivos:** Mantenha o sistema operacional e os aplicativos de seu celular ou computador sempre atualizados.
    
            **Conclusão**
    
            Os golpes bancários representam uma ameaça real e crescente, mas com vigilância e o uso de práticas seguras, é possível reduzir significativamente os riscos. Desconfie de contatos inesperados e proteja suas informações financeiras como se fossem um tesouro.
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
                    <h2 className="font-bold">O que são Golpes Bancários?</h2>
                    <p>{noticia.texto.split('**O que são Golpes Bancários?**')[1].split('**Como Funcionam os Golpes Bancários?**')[0]}</p>
                    <br />
                    <h2 className="font-bold">Como Funcionam os Golpes Bancários?</h2>
                    <p>{noticia.texto.split('**Como Funcionam os Golpes Bancários?**')[1].split('**Principais Tipos de Golpes Bancários**')[0]}</p>
                    <br />
                    <h3 className="font-bold">1. Contato Inicial</h3>
                    <p>
                        Os golpistas iniciam o esquema entrando em contato com a vítima por meio de telefonemas, mensagens de texto ou e-mails. Eles geralmente se apresentam como representantes de instituições financeiras ou órgãos confiáveis, usando linguagem formal para parecerem legítimos. O objetivo é criar uma situação de urgência, como a necessidade de corrigir um "erro" ou evitar uma "fraude", para induzir a vítima a agir rapidamente.
                    </p>
                    <h3 className="font-bold">2. Solicitação de Informações</h3>
                    <p>
                        Após estabelecer o contato, os criminosos pedem dados sensíveis, como números de cartão, senhas, códigos de verificação ou chaves Pix. Eles podem solicitar que a vítima preencha formulários falsos, confirme informações pessoais ou até mesmo forneça acesso remoto ao dispositivo para “solucionar problemas técnicos”. O discurso é planejado para transmitir segurança e urgência, dificultando que a vítima perceba o golpe.
                    </p>
                    <h3 className="font-bold">3. Execução do Golpe</h3>
                    <p>
                        Com as informações obtidas, os golpistas realizam transações fraudulentas, clonam cartões, transferem valores via Pix ou acessam contas bancárias da vítima. Em alguns casos, eles vendem os dados no mercado negro, aumentando o impacto do crime. As consequências para a vítima podem incluir perdas financeiras significativas, comprometimento de informações pessoais e danos à reputação.
                    </p>

                    <br />
                    <h2 className="font-bold">Principais Tipos de Golpes Bancários</h2>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>Falsas Centrais de Atendimento:</strong> Golpistas se passam por atendentes de bancos para coletar informações sensíveis, como senhas, números de conta e cartões. Normalmente, eles entram em contato por telefone ou mensagens, alegando a necessidade de atualizar dados ou resolver problemas urgentes.
                        </li>
                        <li>
                            <strong>Clonagem de Cartões:</strong> Técnica onde dispositivos chamados "chupa-cabras" são instalados em terminais de pagamento ou caixas eletrônicos para capturar os dados do cartão. Esses dados são usados para realizar compras ou saques fraudulentos.
                        </li>
                        <li>
                            <strong>Phishing Bancário:</strong> Golpe no qual criminosos enviam e-mails ou mensagens que aparentam ser de instituições financeiras. Esses contatos geralmente contêm links para sites falsos onde as vítimas inserem suas informações bancárias, que são então roubadas.
                        </li>
                        <li>
                            <strong>Golpes com QR Codes:</strong> Criminosos substituem QR Codes legítimos por falsos em locais públicos, como restaurantes ou terminais de pagamento. Quando escaneados, esses códigos redirecionam para sites fraudulentos ou transferem valores para contas de golpistas.
                        </li>
                        <li>
                            <strong>Fraudes de Pix:</strong> Utilizando a velocidade das transferências Pix, os golpistas induzem vítimas a transferir dinheiro para contas sob o pretexto de ofertas falsas, urgências financeiras ou até mesmo se passando por conhecidos das vítimas.
                        </li>
                    </ul>

                    <br />
                    <h2 className="font-bold">Como se Proteger de Golpes Bancários</h2>
                    <ol className="list-decimal pl-5">
                        <li>Nunca Compartilhe Senhas ou Códigos de Segurança</li>
                        <li>Evite Clicar em Links Não Solicitados</li>
                        <li>Ative Notificações de Transações</li>
                        <li>Utilize Autenticação de Dois Fatores</li>
                        <li>Verifique QR Codes</li>
                        <li>Atualize Regularmente Seus Dispositivos</li>
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