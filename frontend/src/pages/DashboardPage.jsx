import { useState, useEffect } from 'react';
import axios from 'axios';
import AddClienteForm  from '../components/AddClienteForm';

function DashboardPage() {  
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClientes = () => {
        setLoading(true);
        axios.get('http://localhost:3000/api/clientes')
            .then(response => {
                setClientes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Erro ao buscar clientes:", error);
                setError('Não foi possível carregar os clientes.');
                setLoading(false);
            }); 
    };
    useEffect(() => {
        fetchClientes();
    }, []);

    const handleClientAdded = (newClient) => {
        setClientes(prevClients => [...prevClients, newClient]);
    };

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro: {error}</div>;

    return (
        <div>
            <h2>Dashboard de Clientes</h2>
            <p>Adicione novos clientes e visualize os existentes.</p>

            <AddClienteForm onClientAdded={handleClientAdded} />

            <hr />

            <h3>Lista de Clientes Cadastrado</h3>
            <div className="clientes-list">
                {clientes.length === 0 ? (
                    <p>Nenhum cliente cadastrado ainda.</p>
                ) : (
                    <ul>
                        {clientes.map(client => (
                            <li key={client.id}>
                                <strong>{client.nome}</strong> - {client.cpf_cnpj} - {client.email || 'sem email'}
                            </li>
                        ))}
                    </ul>
                )}

            </div>
        </div>
    );
}

export default DashboardPage;