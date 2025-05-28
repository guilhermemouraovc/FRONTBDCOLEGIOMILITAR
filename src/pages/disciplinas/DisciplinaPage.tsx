import React, { useEffect, useState } from 'react';
import { Disciplina } from '../../services/disciplinaService';
import { crud } from '../../services/api';
import DisciplinaForm from './DisciplinaForm';

const DisciplinaPage: React.FC = () => {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editDisciplina, setEditDisciplina] = useState<Disciplina | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const lista = await crud.list<Disciplina>('/disciplinas');
        setDisciplinas(lista);
      } catch {
        setError('Erro ao buscar disciplinas');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir esta disciplina?')) return;
    try {
      await crud.delete('/disciplinas', id);
      setDisciplinas(disciplinas.filter(d => d.id_disciplina !== id));
    } catch {
      alert('Não foi possível excluir');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Disciplinas</h1>

      <button
        onClick={() => {
          setEditDisciplina(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Adicionar Disciplina
      </button>

      {showForm && (
        <div className="mb-6">
          <DisciplinaForm
            disciplina={editDisciplina}
            onSubmit={async (data) => {
              if (editDisciplina) {
                // UPDATE
                await crud.update<Disciplina, Disciplina>(
                  '/disciplinas',
                  editDisciplina.id_disciplina,
                  data
                );
              } else {
                // CREATE
                await crud.create<Disciplina>('/disciplinas', data);
              }
              // Recarrega lista e fecha form
              const lista = await crud.list<Disciplina>('/disciplinas');
              setDisciplinas(lista);
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
                <th className="p-2">Nota</th>
                <th className="p-2">Carga Horária</th>
                <th className="p-2">Descrição</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {disciplinas.map(disciplina => (
                <tr key={disciplina.id_disciplina} className="border-b">
                  <td className="p-2">{disciplina.id_disciplina}</td>
                  <td className="p-2">{disciplina.nome}</td>
                  <td className="p-2">{disciplina.nota?.valor}</td>
                  <td className="p-2">{disciplina.carga_horaria}</td>
                  <td className="p-2">{disciplina.descricao}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditDisciplina(disciplina);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 bg-yellow-600 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(disciplina.id_disciplina)}
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

export default DisciplinaPage; 