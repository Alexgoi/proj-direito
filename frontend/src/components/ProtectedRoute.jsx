// frontend/src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Este componente é um "wrapper" ou "embrulho"
function ProtectedRoute({ children }) {
  const { user } = useAuth(); // Pega a informação do usuário

  // Se NÃO houver usuário, redireciona para a página de login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se houver usuário, renderiza a página que ele tentou acessar (os "children")
  return children;
}

export default ProtectedRoute;