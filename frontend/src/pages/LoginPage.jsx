// frontend/src/pages/LoginPage.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

// Garanta que o nome da função é exatamente este
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/'); // Redireciona para o dashboard após login
    } catch (err) {
      setError("Email ou senha inválidos. Tente novamente.");
    }
  };

  return (
    <div className="container">
      <div className="login-form-container">
        <h2>Acesso ao Sistema</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>
        <p className="auth-switch-link">
          Não tem uma conta? <Link to="/registrar">Registre-se</Link>
        </p>
        {error && <p style={{color: 'red', marginTop: '1rem'}}>{error}</p>}
      </div>
    </div>
  );
}

// 👇 A LINHA MAIS IMPORTANTE E PROVÁVEL CAUSA DO ERRO 👇
// Garanta que esta linha existe no final do arquivo.
export default LoginPage;