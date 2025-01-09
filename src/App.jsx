import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "./pages/Home/Home";
import Contato from "./pages/Contato/Contato";
import Login from './pages/Login/Login';
import CriarConta from './pages/CriarConta/CriaConta';
import Denunciar from './pages/Denunciar/Denunciar';
import Golpes from './pages/Golpes/golpes';
import Forum from "./pages/Forum/Forum";
import Phishing from './pages/Noticias/Phishing';
import ClonagemCartoes from './pages/Noticias/ClonagemCartoes';
import FraudeRedesSociais from './pages/Noticias/FraudeRedesSociais';
import GolpesBancarios from './pages/Noticias/GolpesBancarios';
import Ransomware from './pages/Noticias/Ransomware';
import SitesFalsosCompras from './pages/Noticias/SitesFalsosCompras';
import Trojan from './pages/Noticias/Trojan';
import Worm from './pages/Noticias/Worm';
import Topico from './pages/Forum/Topicos';
import TopicoDetails from './pages/Forum/TopicoDetails'; // Import the TopicoDetails component

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/denunciar' element={<Denunciar />} />
          <Route path='/contato' element={<Contato />} />
          <Route path='/criarconta' element={<CriarConta />} />
          <Route path='/golpes' element={<Golpes />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/forum/topicos' element={<Topico />} />
          <Route path='/forum/:id' element={<TopicoDetails />} /> {/* Add this route */}
          <Route path="/noticias/fraude-redes-sociais" element={<FraudeRedesSociais />} />
          <Route path="/noticias/golpes-bancarios" element={<GolpesBancarios />} />
          <Route path="/noticias/phishing" element={<Phishing />} />
          <Route path="/noticias/ransomware" element={<Ransomware />} />
          <Route path="/noticias/sites-falsos-compras" element={<SitesFalsosCompras />} />
          <Route path="/noticias/worm" element={<Worm />} />
          <Route path='/noticias/trojan' element={<Trojan />} />
          <Route path="/noticias/clonagem-cartoes" element={<ClonagemCartoes />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
