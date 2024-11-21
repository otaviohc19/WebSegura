import Menu from "../../components/menu";
import MenuLateral from "../../components/menuLateral";
import Footer from "../../components/footer";

export default function SitesFalsosCompras() {
    const noticia = {
        link: "sites-falsos-compras",
        imagem: "../img/redes.webp",
        titulo: "Sites Falsos de Compras Online",
        categoria: "Golpes de E-commerce",
        texto: `
        Sites falsos se passam por plataformas de compras legítimas, oferecendo produtos a preços muito baixos para atrair usuários. Antes de comprar online, verifique sempre a URL e procure informações sobre a reputação do site.
    
        **O que são Sites Falsos de Compras Online?**  
        Sites falsos de compras online são páginas fraudulentas que se disfarçam de lojas legítimas para enganar os consumidores. Eles geralmente oferecem descontos irresistíveis e produtos populares a preços muito abaixo do mercado para atrair compradores desavisados. O objetivo é roubar os dados bancários ou pessoais das vítimas.
    
        **Como Funcionam?**  
        A fraude com sites falsos geralmente ocorre em três etapas principais:
        1. **Atração:** O site falso é promovido com ofertas tentadoras em redes sociais, e-mails ou anúncios.
        2. **Engano:** O usuário, atraído pelos preços baixos, clica no link e é levado a uma página que imita um site de compras conhecido.
        3. **Roubo de Dados:** Após a compra, os criminosos coletam as informações financeiras da vítima e podem até cobrar valores maiores do que o prometido.
    
        **Principais Características de Sites Falsos**  
        - **Preços Aparentemente Imbatíveis:** Ofertas muito abaixo do preço de mercado.
        - **URLs Suspeitas:** Endereços de sites que não correspondem ao nome oficial de uma loja.
        - **Falta de Informações de Contato:** Ausência de detalhes sobre a empresa, como endereço, telefone ou e-mail.
        - **Pagamentos Inseguros:** O site utiliza métodos de pagamento não confiáveis ou solicita transferências bancárias diretas.
    
        **Como se Proteger?**  
        1. Verifique sempre a URL do site antes de comprar.  
        2. Pesquise a reputação do site em fóruns e redes sociais.  
        3. Utilize plataformas de pagamento seguras, como cartões de crédito ou sistemas de pagamento confiáveis.  
        4. Desconfie de ofertas que pareçam boas demais para ser verdade.  
        5. Procure por avaliações de outros consumidores sobre o site.
    
        **Conclusão**  
        Embora os sites falsos de compras online sejam comuns, estar atento a detalhes como a URL e a reputação da loja pode ajudá-lo a evitar cair nesse tipo de golpe.`
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
                    <h2 className="font-bold">O que são Sites Falsos de Compras Online?</h2>
                    <p>{noticia.texto.split('**O que são Sites Falsos de Compras Online?**')[1].split('**Como Funcionam?**')[0]}</p>
                    <br />
                    <h2 className="font-bold">Como Funcionam?</h2>
                    <p>{noticia.texto.split('**Como Funcionam?**')[1].split('**Principais Características de Sites Falsos**')[0]}</p>
                    <br />
                    <h3 className="font-bold">1. Atração</h3>
                    <p>
                        Os golpistas promovem links de sites falsos em anúncios, redes sociais ou até por e-mail. O objetivo é atrair vítimas com ofertas tentadoras de produtos a preços imbatíveis.
                    </p>
                    <h3 className="font-bold">2. Engano</h3>
                    <p>
                        O usuário é redirecionado para uma página que imita sites conhecidos de compras online, onde pode realizar a "compra" de produtos a preços baixos.
                    </p>
                    <h3 className="font-bold">3. Roubo de Dados</h3>
                    <p>
                        Após a transação, os golpistas coletam as informações financeiras da vítima, podendo ainda cobrar valores adicionais ou realizar transações fraudulentas.
                    </p>
                    <br />
                    <h2 className="font-bold">Principais Características de Sites Falsos</h2>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>Preços Aparentemente Imbatíveis:</strong> Ofertas muito abaixo do preço de mercado que atraem a vítima.
                        </li>
                        <li>
                            <strong>URLs Suspeitas:</strong> Endereços de sites que não correspondem ao nome oficial de uma loja confiável.
                        </li>
                        <li>
                            <strong>Falta de Informações de Contato:</strong> A ausência de um telefone, e-mail ou endereço físico no site é um sinal claro de golpe.
                        </li>
                        <li>
                            <strong>Pagamentos Inseguros:</strong> Sites que solicitam pagamentos por métodos não seguros ou transferências bancárias diretas.
                        </li>
                    </ul>
                    <br />
                    <h2 className="font-bold">Como se Proteger?</h2>
                    <ol className="list-decimal pl-5">
                        <li>Verifique sempre a URL do site antes de comprar.</li>
                        <li>Pesquise a reputação do site em fóruns e redes sociais.</li>
                        <li>Utilize plataformas de pagamento seguras, como cartões de crédito ou sistemas de pagamento confiáveis.</li>
                        <li>Desconfie de ofertas que pareçam boas demais para ser verdade.</li>
                        <li>Procure por avaliações de outros consumidores sobre o site.</li>
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