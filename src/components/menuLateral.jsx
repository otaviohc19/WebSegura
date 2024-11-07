export default function MenuLateral() {
    return (
      <div className="bg-cyan-400 p-5 fixed right-0 top-0 h-full w-1/12">
        <div className="">
          <h3 className="font-bold underline">Em Alta</h3>
          <a className="menuLateralItem" href="#">Banco<br /></a>
          <a className="menuLateralItem" href="#">WhatsApp<br /></a>
          <a className="menuLateralItem" href="#">Redes Sociais<br /></a>
          <a className="menuLateralItem" href="#">Vendas Online<br /></a>
        </div>
        <div className="pt-5">
          <h3 className="font-bold underline">Mais Acessados</h3>
          <a className="menuLateralItem" href="#">Ransonware<br /></a>
          <a className="menuLateralItem" href="#">Phishing<br /></a>
          <a className="menuLateralItem" href="#">Engenharia Social<br /></a>
        </div>
        <div className="pt-5">
          <h3 className="font-bold underline">Fale Conosco</h3>
          <a className="menuLateralItem" href="#">Contato<br /></a>
        </div>
        <div className="flex-grow flex items-end absolute">
          <img className="w-auto max-w-full" src="../../img/logo-no-background.png" />
        </div>
      </div>
    );
  }
  