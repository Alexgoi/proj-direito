// frontend/src/pages/ClientsPage.jsx
import { useState, useEffect } from 'react';
import api from '../api/axiosConfig.js';
import AddClientForm from '../components/AddClientForm';

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  // ... (outros estados como 'error' se desejar)

  useEffect(() => {
    api.get('http://localhost:3000/api/clientes')
      .then(response => {
        setClients(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar clientes:", error);
        setLoading(false);
      });
  }, []);

  const handleClientAdded = (newClient) => {
    setClients(prevClients => [...prevClients, newClient].sort((a, b) => a.nome.localeCompare(b.nome)));
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="container">
      <h2>Gestão de Clientes</h2>
      <AddClientForm onClientAdded={handleClientAdded} />
      <hr />
      <h3>Clientes Cadastrados</h3>
      <ul className="client-list">
        {clients.map(client => (
          <li key={client.id}>
            <strong>{client.nome}</strong> ({client.cpf_cnpj})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;