import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRoute';
import DiretoresPage from './pages/diretores/DiretoresPage';
import TurmaPage from './pages/turmas/TurmaPage';
import ResponsavelPage from './pages/responsaveis/ResponsavelPage';
import AlunosPage from './pages/alunos/AlunoPage';
import ProfessorPage from './pages/professores/ProfessorPage';
import ClubePage from './pages/clubes/ClubePage';
import DisciplinaPage from './pages/disciplinas/DisciplinaPage'; 
import NotaPage from './pages/notas/NotaPage';
import PesoPage from './pages/pesos/PesoPage';
import LancamentoNotaPage from './pages/lancamentos-nota/LancamentoNotaPage';
import FardamentoPage from './pages/fardamentos/FardamentoPage';
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
            <Route path="/turmas" element={<TurmaPage />} />
            <Route path="/responsaveis" element={<ResponsavelPage />} />
            <Route path="/alunos" element={<AlunosPage />} />
            <Route path="/professores" element={<ProfessorPage />} />
            <Route path="/clubes" element={<ClubePage />} />
            <Route path="/disciplinas" element={<DisciplinaPage />} />
            <Route path="/notas" element={<NotaPage />} />
            <Route path="/pesos" element={<PesoPage />} />
            <Route path="/lancamentos-nota" element={<LancamentoNotaPage />} />
            <Route path="/fardamentos" element={<FardamentoPage />} />
            
            {/* Redirect root to dashboard */}
            
            {/* Placeholder routes for future implementation */}
            
            
            <Route path="/lancamentos-nota" element={<div className="p-6">Página de Lançamentos de Nota em desenvolvimento</div>} />
            
            
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