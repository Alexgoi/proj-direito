// frontend/src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'; // Precisamos do axios aqui

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (e) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  // 👇 FUNÇÃO DE LOGIN ATUALIZADA 👇
  const login = async (email, senha) => {
    try {
      // Faz a chamada para nossa API de login no backend
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        senha,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token); // Salva o token no armazenamento
        const decodedUser = jwtDecode(token);
        setUser(decodedUser); // Atualiza o estado com os dados do usuário
      }
    } catch (error) {
      // Se o login falhar, o erro será lançado para ser tratado na página de Login
      console.error("Falha no login:", error.response?.data?.error || error.message);
      throw error; // Lança o erro para o componente que chamou
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};