// frontend/src/pages/RegisterPage.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; 

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    oab: '',
    uf_oab: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      await axios.post('http://localhost:3000/api/auth/registrar', formData);
      
      alert('Usuário registrado com sucesso! Você será redirecionado para a página de login.');
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Não foi possível registrar. Verifique os dados e tente novamente.";
      console.error("Erro ao registrar:", errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="container">
      <div className="login-form-container"> {/* Reutilizando o estilo do form */}
        <h2>Registrar Novo Usuário</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="oab">Nº OAB (ex: 12345)</label>
            <input type="text" id="oab" name="oab" value={formData.oab} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="uf_oab">UF da OAB (ex: RS)</label>
            <input type="text" id="uf_oab" name="uf_oab" value={formData.uf_oab} onChange={handleChange} maxLength="2" />
          </div>
          <button type="submit" className="login-button">Registrar</button>
        </form>

        <p className="auth-switch-link">
          Já tem uma conta? <Link to="/login">Faça o login</Link>
        </p>

        {error && <p style={{color: 'red', marginTop: '1rem'}}>{error}</p>}
      </div>
    </div>
  );
}

export default RegisterPage;