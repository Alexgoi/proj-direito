import { useState } from 'react';
import axios from 'axios';

function AddClienteForm({ onClientAdded }) {
    const [nome, setNome] = useState('');
    const [cpfCnpj, setcpfCnpj] = useState('');   
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [error, setError] = useState(null);   

    const handleSubmit = async (event) =>{
        event.preventDefault();
        setError(null); // Limpa erros anteriores

        const novoCliente = { nome, cpf_cnpj: cpf_cnpj, email, telefone, endereco };

        try{
            const response = await axios.post('http://localhost:3000/api/clientes', novoCliente);
            onClienteAdded(response.data); // Chama a função de callback com o novo cliente
            setNome('');
            setcpfCnpj(''); 
            setEmail('');
            setTelefone('');
            setEndereco('');
        } catch (err){
            console.error("Erro ao adicionar cliente:", err);
            setError('Erro ao adicionar cliente. Verifique os dados.');
        }
    };

    return (
        <div className='add-cliente-form'>
            <h3>Adicionar Novo Cliente</h3>
            <form onSubmit="{handleSubmit}">
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome completo" required />
                <input type="text" value={cpfCnpj} onChange={e => setcpfCnpj(e.target.value)} placeholder="CPF/CNPJ" required />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="tel" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Telefone" />
                <input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Endereço" /> 
                <button type="submit">Adicionar Cliente</button>  
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default AddClienteForm;