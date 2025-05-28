import React, { useEffect, useState } from 'react';
import { Professor } from '../../services/professorService';
import { crud } from '../../services/api';
import ProfessorForm from './ProfessorForm';

const ProfessorPage: React.FC = () => {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editProfessor, setEditProfessor] = useState<Professor | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const lista = await crud.list<Professor>('/professores');
        setProfessores(lista);
      } catch {
        setError('Erro ao buscar professores');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir este professor?')) return;
    try {
      await crud.delete('/professores', id);
      setProfessores(professores.filter(p => p.id_professor !== id));
    } catch {
      alert('Não foi possível excluir');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Professores</h1>

      <button
        onClick={() => {
          setEditProfessor(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Adicionar Professor
      </button>

      {showForm && (
        <div className="mb-6">
          <ProfessorForm
            professor={editProfessor}
            onSubmit={async (data) => {
              if (editProfessor) {
                // UPDATE
                await crud.update<Professor, Professor>(
                  '/professores',
                  editProfessor.id_professor,
                  data
                );
              } else {
                // CREATE
                await crud.create<Professor>('/professores', data);
              }
              // Recarrega lista e fecha form
              const lista = await crud.list<Professor>('/professores');
              setProfessores(lista);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-green-800 text-white">
                <th className="p-2">ID</th>
                <th className="p-2">Nome</th>
                <th className="p-2">Turma</th>
                <th className="p-2">Diretor</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {professores.map(p => (
                <tr key={p.id_professor} className="border-b">
                  <td className="p-2">{p.id_professor}</td>
                  <td className="p-2">{p.nome}</td>
                  <td className="p-2">{p.turma?.ano_escolar}</td>
                  <td className="p-2">{p.diretor?.nome}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditProfessor(p);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 bg-yellow-600 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id_professor)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfessorPage; 