import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";

export default function Ransomware() {
    const noticia = {
        link: "ransomware",
        imagem: "../img/ransonware.jpeg",
        titulo: "Ransomware: O Vírus que Faz Sequestrar Seus Dados",
        categoria: "Malware",
        texto: `
        O ransomware é um tipo de malware que criptografa os dados da vítima e exige um pagamento em troca da chave para desbloquear os arquivos. Esse tipo de ataque é altamente prejudicial e pode afetar tanto indivíduos quanto empresas. A prevenção inclui manter backups atualizados e evitar abrir anexos desconhecidos.
    
        **O que é o Ransomware?**  
        O ransomware é um software malicioso que invade o computador da vítima, criptografa seus arquivos e exige um resgate (geralmente em criptomoeda) para liberar a chave de descriptografia. O ataque pode afetar tanto arquivos pessoais, como fotos e documentos, quanto sistemas inteiros em empresas e organizações.
    
        **Como Funcionam os Ransomwares?**  
        Após ser instalado no computador, o ransomware criptografa os arquivos do sistema da vítima, tornando-os inacessíveis. Uma vez que o ataque é realizado, os criminosos exigem o pagamento de um valor em troca da chave de descriptografia. Caso o pagamento não seja feito, os arquivos podem ser permanentemente perdidos ou o valor do resgate pode aumentar.
    
        **Principais Métodos de Distribuição do Ransomware**  
        - **E-mails Falsos:** Os criminosos enviam e-mails contendo anexos maliciosos ou links para sites que infectam o computador com ransomware quando abertos.  
        - **Vulnerabilidades de Software:** O ransomware também pode ser distribuído explorando falhas de segurança em softwares desatualizados, como navegadores ou sistemas operacionais.  
        - **Sites Maliciosos:** Sites comprometidos ou fraudulentos podem instalar ransomware automaticamente no computador sem o conhecimento do usuário.
    
        **Como se Proteger contra Ransomware?**  
        1. Mantenha backups regulares e armazene-os em locais seguros, como na nuvem ou em dispositivos externos.  
        2. Atualize seu sistema operacional e softwares regularmente para corrigir vulnerabilidades.  
        3. Não abra anexos ou clique em links de e-mails de fontes desconhecidas ou suspeitas.  
        4. Utilize antivírus e ferramentas de segurança para detectar e bloquear ameaças.  
        5. Ative firewalls para prevenir acessos não autorizados à sua rede.
    
        **Conclusão**  
        O ransomware é uma ameaça crescente que pode causar danos irreparáveis a indivíduos e empresas. Com precauções adequadas, como backups e cuidados ao navegar na internet, você pode minimizar o risco de ser vítima desse tipo de ataque.`
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
                    <h2 className="font-bold">O que é o Ransomware?</h2>
                    <p>{noticia.texto.split('**O que é o Ransomware?**')[1].split('**Como Funcionam os Ransomwares?**')[0]}</p>
                    <br />
                    <h2 className="font-bold">Como Funcionam os Ransomwares?</h2>
                    <p>{noticia.texto.split('**Como Funcionam os Ransomwares?**')[1].split('**Principais Métodos de Distribuição do Ransomware**')[0]}</p>
                    <br />
                    <h3 className="font-bold">Principais Métodos de Distribuição do Ransomware</h3>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>E-mails Falsos:</strong> Golpistas enviam e-mails com anexos maliciosos ou links para sites infectados com ransomware.
                        </li>
                        <li>
                            <strong>Vulnerabilidades de Software:</strong> O ransomware pode ser distribuído explorando falhas em sistemas desatualizados.
                        </li>
                        <li>
                            <strong>Sites Maliciosos:</strong> Sites comprometidos podem instalar ransomware automaticamente ao ser acessados.
                        </li>
                    </ul>
                    <br />
                    <h2 className="font-bold">Como se Proteger contra Ransomware?</h2>
                    <ol className="list-decimal pl-5">
                        <li>Mantenha backups regulares e armazene-os em locais seguros, como na nuvem ou em dispositivos externos.</li>
                        <li>Atualize seu sistema operacional e softwares regularmente para corrigir vulnerabilidades.</li>
                        <li>Não abra anexos ou clique em links de e-mails de fontes desconhecidas ou suspeitas.</li>
                        <li>Utilize antivírus e ferramentas de segurança para detectar e bloquear ameaças.</li>
                        <li>Ative firewalls para prevenir acessos não autorizados à sua rede.</li>
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