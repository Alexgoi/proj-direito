// frontend/src/App.jsx (VERSÃO COMPLETA E FINAL)

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ClientsPage from './pages/ClientsPage';
import ProcessosPage from './pages/ProcessosPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Garanta que esta importação existe
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} /> {/* Garanta que esta rota existe */}

          {/* Rotas Protegidas */}
          <Route 
            path="/clientes" 
            element={<ProtectedRoute><ClientsPage /></ProtectedRoute>} 
          />
          <Route 
            path="/processos" 
            element={<ProtectedRoute><ProcessosPage /></ProtectedRoute>} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;