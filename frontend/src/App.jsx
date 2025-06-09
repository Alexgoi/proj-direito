import {useState, useEffect, use} from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [message, setMessage] = useState('Carregando...');

  useEffect(() => {
    axios.get('http://localhost:3000/api/test')
      .then(reponse => {
        setMessage(reponse.data.message);
      })
      .catch(error => {
        console.error("Erro a conectar com o backend:", error);
        setMessage('Falha ao conectar com o backend!');
      });
    });
  return (
    <>
      <h1>Projeto Advocacia</h1>
      <div className="card">
        <p>
          Status da conexão: <strong>{message}</strong>
        </p>
      </div>
    </>
  );
}