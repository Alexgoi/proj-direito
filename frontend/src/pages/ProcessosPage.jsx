// frontend/src/pages/ProcessesPage.jsx
import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

function ProcessosPage() {
  const [processos, setProcessos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncMessage, setSyncMessage] = useState('');
  // ... (outros estados como 'error' se desejar)

const fetchProcessos = async () => {
  try {
    setLoading(true);
    const response = await api.get('/processos');
    setProcessos(response.data);
    setLoading(false);
  } catch (error){
    console.error("Erro ao buscar processos: ", error);
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProcessos();
  }, []);

  const handleSync = async () => {
    setSyncMessage('Sincronizando, por favor aguarde...');
    try{
      const response = await api.get('/pje/sincronizar');
      setSyncMessage(response.data.message);
      fetchProcessos();
    } catch (error){
      const errorMsg = error.response?.data?.error || 'Falha na sincronização';
      setSyncMessage(`Erro: ${errorMsg}`);
      console.error("Erro ao sincronizar: ", error);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="container">
      <h2>Processos Sincronizados</h2>
      <div className="sync-container">
        <button onClick={handleSync} className="login-button">Sincronizar processos</button>
        {syncMessage && <p>{syncMessage}</p>}
      </div>
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