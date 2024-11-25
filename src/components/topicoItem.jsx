import React from 'react';

export default function TopicoItem({ topico }) {
    return (
        <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">{topico.titulo}</h2>
            <p className="text-md text-gray-600 mt-2">{topico.texto}</p>
            <div className="mt-4">
                <span className="text-sm text-gray-500">Categoria: {topico.categoria}</span>
                <span className="ml-4 text-sm text-gray-500">Data: {new Date(topico.data).toLocaleString()}</span>
            </div>
            <div className="mt-6">
                {/* Exibindo as respostas, se houver */}
                <h3 className="font-semibold text-gray-800">Respostas:</h3>
                {topico.respostas && topico.respostas.length > 0 ? (
                topico.respostas.map((resposta) => (
                    <div key={resposta.id} className="mt-4 p-4 border-t border-gray-200">
                        <p className="text-md text-gray-700">{resposta.texto}</p>
                    </div>
                ))
                ) : (
                <p className="text-gray-500">Sem respostas ainda.</p>
                )}

            </div>
        </div>
    );
}
