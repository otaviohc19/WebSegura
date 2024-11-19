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
          <Route path="/noticias/clonagem-cartoes" element={<ClonagemCartoes />} />
          <Route path="/noticia/fraude-redes-sociais" element={<FraudeRedesSociais />} />
          <Route path="/noticia/golpes-bancarios" element={<GolpesBancarios />} />
          <Route path="/noticia/phishing" element={<Phishing />} />
          <Route path="/noticia/ransomware" element={<Ransomware />} />
          <Route path="/noticia/sites-falsos-compras" element={<SitesFalsosCompras />} />
          <Route path="/noticia/worm" element={<Worm />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
