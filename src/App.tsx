import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRoute';
import DiretoresPage from './pages/diretores/DiretoresPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/diretores" element={<DiretoresPage />} />
            
            {/* Placeholder routes for future implementation */}
            <Route path="/turmas" element={<div className="p-6">Página de Turmas em desenvolvimento</div>} />
            <Route path="/responsaveis" element={<div className="p-6">Página de Responsáveis em desenvolvimento</div>} />
            <Route path="/alunos" element={<div className="p-6">Página de Alunos em desenvolvimento</div>} />
            <Route path="/professores" element={<div className="p-6">Página de Professores em desenvolvimento</div>} />
            <Route path="/clubes" element={<div className="p-6">Página de Clubes em desenvolvimento</div>} />
            <Route path="/disciplinas" element={<div className="p-6">Página de Disciplinas em desenvolvimento</div>} />
            <Route path="/notas" element={<div className="p-6">Página de Notas em desenvolvimento</div>} />
            <Route path="/lancamentos-nota" element={<div className="p-6">Página de Lançamentos de Nota em desenvolvimento</div>} />
            <Route path="/presencas" element={<div className="p-6">Página de Presenças em desenvolvimento</div>} />
            <Route path="/fardamentos" element={<div className="p-6">Página de Fardamentos em desenvolvimento</div>} />
            <Route path="/farda-aluno" element={<div className="p-6">Página de Farda-Aluno em desenvolvimento</div>} />
            <Route path="/clube-aluno" element={<div className="p-6">Página de Clube-Aluno em desenvolvimento</div>} />
            <Route path="/matriculas" element={<div className="p-6">Página de Matrículas em desenvolvimento</div>} />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;