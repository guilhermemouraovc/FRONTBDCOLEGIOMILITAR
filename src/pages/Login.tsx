import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { GraduationCapIcon, LockIcon, UserIcon } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await login({ username, password });
      
      if (response.status === 200 && response.data?.token) {
        navigate('/', { replace: true });
      } else {
        setError(response.error || 'Credenciais inválidas');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light flex flex-col justify-center items-center px-4 relative camo-pattern">
      <div className="absolute inset-0 bg-primary/80"></div>
      
      <div className="w-full max-w-md z-10">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden military-border">
          <div className="bg-primary text-light p-6 text-center">
            <div className="flex justify-center mb-3">
              <GraduationCapIcon size={48} className="text-accent" />
            </div>
            <h1 className="text-2xl font-bold">COLÉGIO MILITAR</h1>
            <p className="text-light/80">Sistema de Gestão Educacional</p>
          </div>
          
          <div className="p-6">
            <div className="bg-accent/10 border border-accent text-dark px-4 py-3 rounded-md mb-4">
              <p className="text-sm">
                <strong>Credenciais de teste:</strong><br />
                Usuário: admin<br />
                Senha: admin123
              </p>
            </div>

            {error && (
              <div className="bg-danger/10 border border-danger/30 text-danger px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-dark font-medium mb-2">
                  Nome de Usuário
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon size={18} className="text-dark/60" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    className="military-input pl-10 w-full"
                    placeholder="Digite seu nome de usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-dark font-medium mb-2">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockIcon size={18} className="text-dark/60" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="military-input pl-10 w-full"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className={`w-full btn btn-primary py-3 flex justify-center ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <a href="#" className="text-primary hover:text-secondary text-sm">
                Esqueceu sua senha?
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6 text-light">
          &copy; 2025 Colégio Militar - Todos os direitos reservados
        </div>
      </div>
    </div>
  );
};

export default Login;