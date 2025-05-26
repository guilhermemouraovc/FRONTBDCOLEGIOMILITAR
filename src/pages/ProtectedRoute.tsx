import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, validateToken } from '../services/authService';

const ProtectedRoute: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = isAuthenticated();
      
      if (auth) {
        // Validate token with backend
        const valid = await validateToken();
        setIsValid(valid);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark/70">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated() && isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;