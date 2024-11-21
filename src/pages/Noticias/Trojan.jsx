import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";

export default function Trojan() {
    const noticia = {
        link: "trojan",
        imagem: "../img/trojan.png",
        titulo: "Vírus Trojan: O Cavalo de Troia Digital",
        categoria: "Malware",
        texto: `
        Os vírus Trojan se disfarçam como softwares legítimos ou inofensivos, mas, uma vez instalados, causam danos ao computador ou roubam dados sensíveis. Eles podem ser distribuídos por e-mails falsos, sites comprometidos ou downloads suspeitos. É essencial manter seu antivírus atualizado e evitar clicar em links desconhecidos.
    
        **O que é o Vírus Trojan?**  
        O vírus Trojan é um tipo de malware que finge ser um software legítimo ou inofensivo para enganar o usuário e fazer com que ele o instale em seu computador. Uma vez ativado, o Trojan pode causar danos significativos, como roubo de informações pessoais, controle remoto do dispositivo e até a instalação de outros malwares.
    
        **Como Funcionam os Vírus Trojan?**  
        Os Trojans geralmente se disfarçam como programas aparentemente úteis ou seguros, como jogos, utilitários ou atualizações de software. Quando o usuário baixa e executa o programa, o malware é instalado no sistema e começa a executar ações prejudiciais, como capturar senhas, instalar backdoors para acesso remoto ou até mesmo destruir arquivos importantes.
    
        **Principais Métodos de Distribuição dos Trojans**  
        - **E-mails Falsos:** Os golpistas enviam e-mails que parecem ser de fontes confiáveis, contendo links ou anexos maliciosos.  
        - **Sites Comprometidos:** Sites aparentemente legítimos podem ser usados para distribuir Trojans por meio de downloads automáticos ou scripts maliciosos.  
        - **Downloads Suspeitos:** Baixar softwares ou aplicativos de fontes não confiáveis é uma das formas mais comuns de infecção por Trojan.
    
        **Como se Proteger contra Vírus Trojan?**  
        1. Mantenha seu antivírus sempre atualizado e faça varreduras regulares no seu computador.  
        2. Evite clicar em links desconhecidos ou baixar arquivos de fontes não confiáveis.  
        3. Não abra anexos de e-mails de remetentes desconhecidos ou suspeitos.  
        4. Sempre baixe software apenas de sites oficiais e fontes confiáveis.  
        5. Habilite atualizações automáticas de seu sistema operacional e aplicativos para corrigir vulnerabilidades de segurança.
    
        **Conclusão**  
        Vírus Trojan são ameaças digitais graves, mas com algumas precauções, como o uso de antivírus atualizado e a cautela ao navegar na internet, você pode evitar ser vítima desse tipo de malware.`
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
                    <h2 className="font-bold">O que é o Vírus Trojan?</h2>
                    <p>{noticia.texto.split('**O que é o Vírus Trojan?**')[1].split('**Como Funcionam os Vírus Trojan?**')[0]}</p>
                    <br />
                    <h2 className="font-bold">Como Funcionam os Vírus Trojan?</h2>
                    <p>{noticia.texto.split('**Como Funcionam os Vírus Trojan?**')[1].split('**Principais Métodos de Distribuição dos Trojans**')[0]}</p>
                    <br />
                    <h3 className="font-bold">Principais Métodos de Distribuição dos Trojans</h3>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>E-mails Falsos:</strong> Golpistas enviam e-mails contendo links ou anexos maliciosos, fingindo ser fontes confiáveis.
                        </li>
                        <li>
                            <strong>Sites Comprometidos:</strong> Sites aparentemente legítimos podem instalar Trojans por meio de downloads automáticos.
                        </li>
                        <li>
                            <strong>Downloads Suspeitos:</strong> Baixar programas de fontes não confiáveis pode resultar na instalação do Trojan.
                        </li>
                    </ul>
                    <br />
                    <h2 className="font-bold">Como se Proteger contra Vírus Trojan?</h2>
                    <ol className="list-decimal pl-5">
                        <li>Mantenha seu antivírus sempre atualizado e faça varreduras regulares no seu computador.</li>
                        <li>Evite clicar em links desconhecidos ou baixar arquivos de fontes não confiáveis.</li>
                        <li>Não abra anexos de e-mails de remetentes desconhecidos ou suspeitos.</li>
                        <li>Sempre baixe software apenas de sites oficiais e fontes confiáveis.</li>
                        <li>Habilite atualizações automáticas de seu sistema operacional e aplicativos para corrigir vulnerabilidades de segurança.</li>
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