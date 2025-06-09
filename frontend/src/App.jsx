import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';   // Importa nosso menu
import HomePage from './pages/HomePage';   // Importa nossa nova página de início
import DashboardPage from './pages/DashboardPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <hr />
      {/* A área principal que mudará de acordo com a URL */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;