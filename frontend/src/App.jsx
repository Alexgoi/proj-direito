// frontend/src/App.jsx

// --- GARANTA QUE TODAS AS PÁGINAS ESTÃO SENDO IMPORTADAS AQUI ---
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClientsPage from './pages/ClientsPage';
import ProcessosPage from './pages/ProcessosPage';
import LoginPage from './pages/LoginPage';
import RegisterPage  from './pages/RegisterPage';
 

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clientes" element={<ClientsPage />} />
          <Route path="/processos" element={<ProcessosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;