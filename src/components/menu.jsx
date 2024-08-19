// Menu.jsx

export default function Menu() {

    return (
        <div className="bg-blue-950 p-3 flex justify-around w-full">
            <div className="logo">
                <img className="logo h-10 " src="../../img/logo-no-background.png" />
            </div>

            <div className="menu items-center">
                <a className="menuItem" href="/">Home</a>
                <a className="menuItem" href="/golpes">Golpes</a>
                <a className="menuItem" href="/prevencao">Prevenção</a>
                <a className="menuItem" href="/forum">Forum</a>
                <a className="menuItem" href="/denunciar">Denunciar</a>
            </div>
            
            <button className="bg-white border-2 border-black p-3 rounded-md flex items-center">
                <i className="fas fa-user mr-2"></i> 
                Acessar
            </button>

        </div>
    );
}