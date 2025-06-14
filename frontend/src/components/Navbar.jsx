import { Link } from 'react-router-dom';
import './Navbar.css'; // Importa o CSS para estilizar o Navbar

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Início</Link></li>
                <li><Link to="/dashboard">Dashboard de Clientes</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;