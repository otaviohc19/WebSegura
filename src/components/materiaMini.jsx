// Materia mini

import React from 'react'

export default function materiaMini({imagem, titulo, texto}) {
  return (
	<div>
		<p className="pl-6 pb-0">WhatsApp</p>
		<div className="flex">
			<div className="imagemMateria">
				<a href="#">
					<img className="imgMateria" src={imagem} />
				</a>
			</div>
			<div className="textoMateria">
				<h2>{titulo}</h2>
				<div dangerouslySetInnerHTML={{ __html: texto}} />
			</div>
		</div>
	</div>
  )
}
