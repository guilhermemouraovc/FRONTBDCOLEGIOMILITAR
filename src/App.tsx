import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRoute';

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
            
            {/* Placeholder routes for future implementation */}
            <Route path="/turmas" element={<div className="p-6">Página de Turmas em desenvolvimento</div>} />
            <Route path="/alunos" element={<div className="p-6">Página de Alunos em desenvolvimento</div>} />
            <Route path="/professores" element={<div className="p-6">Página de Professores em desenvolvimento</div>} />
            <Route path="/disciplinas" element={<div className="p-6">Página de Disciplinas em desenvolvimento</div>} />
            <Route path="/notas" element={<div className="p-6">Página de Notas em desenvolvimento</div>} />
            <Route path="/presenca" element={<div className="p-6">Página de Presença em desenvolvimento</div>} />
            <Route path="/matriculas" element={<div className="p-6">Página de Matrículas em desenvolvimento</div>} />
            <Route path="/clube" element={<div className="p-6">Página de Clube em desenvolvimento</div>} />
            <Route path="/fardamento" element={<div className="p-6">Página de Fardamento em desenvolvimento</div>} />
            <Route path="/relatorios" element={<div className="p-6">Página de Relatórios em desenvolvimento</div>} />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;