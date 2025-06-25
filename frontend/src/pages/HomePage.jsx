import {useState, useEffect } from 'react';
import '../App.css';
import api from '../api/axiosConfig';

function HomePage() {
  const [message, setMessage] = useState('Carregando...');
   
  useEffect(() => {
    api.get('http://localhost:3000/api/test')
      .then(reponse => {
        setMessage(reponse.data.message);
      })
      .catch(error => {
        console.error("Erro a conectar com o backend:", error);
        setMessage('Falha ao conectar com o backend!');
      });
    }, []);
  return (
      <div className="container">
        <h1>Sistema de Gestão Jurídica</h1>
        <div className="card">
          <p>
            Status da conexão: <strong>{message}</strong>
          </p>
        </div>
      </div>
  );
}

export default HomePage;