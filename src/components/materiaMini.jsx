import React from 'react';

export default function MateriaMini({ imagem, titulo, categoria, texto }) {
  // Defina uma imagem padrão caso não tenha imagem fornecida
  const imagemDefault = '/uploads/placeholder.jpg';

  return (
    <div className="materia-mini">
      {/* Renderizando a categoria */}
      <p className="pl-6 pb-0 font-semibold text-sm">{categoria}</p>

      <div className="flex">
        {/* Exibição da imagem com fallback para a imagem padrão */}
        <div className="imagemMateria">
          <a href="#">
            <img
              className="imgMateria"
              src={imagem || imagemDefault} // Se a imagem não for fornecida, usa o placeholder
              alt={titulo}
            />
          </a>
        </div>

        <div className="textoMateria pl-4">
          <h2 className="text-xl font-bold">{titulo}</h2>
          {/* Renderiza o conteúdo do texto, mantendo a formatação HTML */}
          <div dangerouslySetInnerHTML={{ __html: texto }} />
        </div>
      </div>
    </div>
  );
}
