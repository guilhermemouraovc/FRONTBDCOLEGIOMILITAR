import React, { useEffect, useState } from 'react';
import { Turma } from '../../services/turmaService';
import { crud } from '../../services/api';
import TurmaForm from './TurmaForm';

const TurmaPage: React.FC = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editTurma, setEditTurma] = useState<Turma | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const lista = await crud.list<Turma>('/turmas');
        setTurmas(lista);
      } catch {
        setError('Erro ao buscar turmas');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir esta turma?')) return;
    try {
      await crud.delete('/turmas', id);
      setTurmas(turmas.filter(t => t.id !== id));
    } catch {
      alert('Não foi possível excluir');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Turmas</h1>

      <button
        onClick={() => {
          setEditTurma(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Adicionar Turma
      </button>

      {showForm && (
        <div className="mb-6">
          <TurmaForm
            turma={editTurma}
            onSubmit={async (data) => {
              if (editTurma) {
                // UPDATE
                await crud.update<Turma, Turma>(
                  '/turmas',
                  editTurma.id,
                  data
                );
              } else {
                // CREATE
                await crud.create<Turma>('/turmas', data);
              }
              // Recarrega lista e fecha form
              const lista = await crud.list<Turma>('/turmas');
              setTurmas(lista);
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
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="p-2">ID</th>
              <th className="p-2">Ano Escolar</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {turmas.map(t => (
              <tr key={t.id} className="border-b">
                <td className="p-2">{t.id}</td>
                <td className="p-2">{t.ano_escolar}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditTurma(t);
                      setShowForm(true);
                    }}
                    className="px-3 py-1 bg-yellow-600 text-white rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TurmaPage; 