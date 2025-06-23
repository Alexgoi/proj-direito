// frontend/src/pages/ProcessesPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProcessosPage() {
  const [processos, setProcessos] = useState([]);
  const [loading, setLoading] = useState(true);
  // ... (outros estados como 'error' se desejar)

  useEffect(() => {
    axios.get('http://localhost:3000/api/processos')
      .then(response => {
        setProcessos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar processos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="container">
      <h2>Processos Sincronizados</h2>
      <p>Esta é a lista de processos encontrados pela API do PJe.</p>
      <hr />
      <ul className="client-list"> {/* Reutilizando o estilo de lista */}
        {processos.map(processo => (
          <li key={processo.id}>
            <strong>Processo:</strong> {processo.numero_processo_cnj}
            <br />
            <strong>Partes:</strong> {processo.parte_autora || '?'} vs {processo.parte_re || '?'}
            <br/>
            <em>({processo.titulo})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProcessosPage;