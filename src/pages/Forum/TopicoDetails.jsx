import React, { useEffect, useState } from 'react';

function TopicoDetails({ id }) {
  const [topico, setTopico] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/forum/${id}`) // Certifique-se de que a URL está correta
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setTopico(data))
      .catch(error => {
        console.error('Error fetching topico:', error);
        setError(error);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!topico) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{topico.titulo}</h1>
      <p>{topico.texto}</p>
      <p>Categoria: {topico.categoria}</p>
      <p>Data: {new Date(topico.data).toLocaleString()}</p>
      {/* Add more fields as needed */}
    </div>
  );
}

export default TopicoDetails;