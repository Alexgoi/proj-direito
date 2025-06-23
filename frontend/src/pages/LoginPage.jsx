// frontend/src/pages/LoginPage.jsx

import { Link } from 'react-router-dom'; // Garanta que esta importação existe
import '../App.css';

function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Funcionalidade de login em construção!');
  };

  return (
    <div className="container">
      <div className="login-form-container">
        <h2>Acesso ao Sistema</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>
        
        {/* ESTA É A PARTE QUE ESTAVA FALTANDO */}
        <p className="auth-switch-link">
          Não tem uma conta? <Link to="/registrar">Registre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;