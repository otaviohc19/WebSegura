import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "./pages/Home/Home";
import Contato from "./pages/Contato/Contato";
import Login from './pages/Login/Login';
import CriarConta from './pages/CriarConta/CriaConta';
import Denunciar from './pages/Denunciar/Denunciar';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/denunciar' element={<Denunciar/>} />
          <Route path='/contato' element={<Contato />} />
          <Route path='/criarconta' element={<CriarConta />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
