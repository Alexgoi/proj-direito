// frontend/src/components/Navbar.jsx

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Importamos nosso hook de autenticação
import './Navbar.css';

function Navbar() {
  // 2. Pegamos o 'user' e a função 'logout' do nosso cérebro de autenticação
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <nav className="navbar"> 
      <ul>
        <li><Link to="/">Início</Link></li>

        {/* Mostra o link do Dashboard apenas se o usuário estiver logado */}
        {user && <li><Link to="/clientes">Clientes</Link></li>}
        {user && <li><Link to="/processos">Processos</Link></li>}

        {/* Usamos um operador ternário para mudar o final do menu */}
        {user ? (
          // 3. Se EXISTE um usuário logado, mostramos isso:
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span style={{ color: 'white' }}>Bem-vindo(a), {user.nome}!</span>
            <button onClick={handleLogout} className="logout-button">Sair</button>
          </div>
        ) : (
          // 4. Se NÃO EXISTE um usuário, mostramos isso:
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '30px' }}>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/registrar">Registrar</Link></li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;