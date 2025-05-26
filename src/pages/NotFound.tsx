import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangleIcon } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangleIcon size={64} className="text-warning" />
        </div>
        <h1 className="text-4xl font-bold text-dark mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-dark/80 mb-4">Página Não Encontrada</h2>
        <p className="text-dark/70 mb-6 max-w-md">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Link 
          to="/" 
          className="btn btn-primary inline-flex items-center"
        >
          Voltar ao Painel
        </Link>
      </div>
    </div>
  );
};

export default NotFound;