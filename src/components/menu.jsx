// Menu.jsx

export default function Menu() {

    return (
        <div className="bg-blue-950 p-3 flex justify-around items-center w-full">
            <div className="logo bg-white p-1 rounded-full flex justify-center items-center">
                <a href="/"><img className="h-10" src="../../img/logo-no-background.png" alt="Logo" /></a>
            </div>

            <div className="menu flex items-center space-x-6">
                <a className="menuItem text-white transition duration-300 ease-in-out hover:text-blue-500 hover:underline focus:outline-none focus:text-blue-600" href="/">
                    Home
                </a>
                <a className="menuItem text-white transition duration-300 ease-in-out hover:text-blue-500 hover:underline focus:outline-none focus:text-blue-600" href="/golpes">
                    Golpes
                </a>
                <a className="menuItem text-white transition duration-300 ease-in-out hover:text-blue-500 hover:underline focus:outline-none focus:text-blue-600" href="/prevencao">
                    Prevenção
                </a>
                <a className="menuItem text-white transition duration-300 ease-in-out hover:text-blue-500 hover:underline focus:outline-none focus:text-blue-600" href="/forum">
                    Forum
                </a>
                <a className="menuItem text-white transition duration-300 ease-in-out hover:text-blue-500 hover:underline focus:outline-none focus:text-blue-600" href="/denunciar">
                    Denunciar
                </a>
            </div>

            
            <a href="/login" className="bg-white border-2 border-black p-3 rounded-md flex items-center transition duration-300 ease-in-out hover:bg-gray-100 hover:border-blue-500 hover:shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <i className="fas fa-user mr-2 text-black"></i> 
                Acessar
            </a>

        </div>
    );
}