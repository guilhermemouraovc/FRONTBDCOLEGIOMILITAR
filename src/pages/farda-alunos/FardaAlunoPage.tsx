import React, { useEffect, useState } from 'react';
import { FardaAluno } from '../../services/fardaAlunoService';
import { crud } from '../../services/api';
import FardaAlunoForm from './FardaAlunoForm';

const FardaAlunoPage: React.FC = () => {
  const [fardasAlunos, setFardasAlunos] = useState<FardaAluno[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editFardaAluno, setEditFardaAluno] = useState<FardaAluno | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const lista = await crud.list<FardaAluno>('/farda-alunos');
        setFardasAlunos(lista);
      } catch {
        setError('Erro ao buscar entregas de fardas');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir esta entrega de farda?')) return;
    try {
      await crud.delete('/farda-alunos', id);
      setFardasAlunos(fardasAlunos.filter(f => f.id_farda_aluno !== id));
    } catch {
      alert('Não foi possível excluir');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Entrega de Fardas</h1>

      <button
        onClick={() => {
          setEditFardaAluno(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Registrar Entrega
      </button>

      {showForm && (
        <div className="mb-6">
          <FardaAlunoForm
            fardaAluno={editFardaAluno}
            onSubmit={async (data) => {
              if (editFardaAluno) {
                // UPDATE
                await crud.update<FardaAluno, FardaAluno>(
                  '/farda-alunos',
                  editFardaAluno.id_farda_aluno,
                  data
                );
              } else {
                // CREATE
                await crud.create<FardaAluno>('/farda-alunos', data);
              }
              // Recarrega lista e fecha form
              const lista = await crud.list<FardaAluno>('/farda-alunos');
              setFardasAlunos(lista);
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
                <th className="p-2">Aluno</th>
                <th className="p-2">Fardamento</th>
                <th className="p-2">Data de Entrega</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {fardasAlunos.map(fardaAluno => (
                <tr key={fardaAluno.id_farda_aluno} className="border-b">
                  <td className="p-2">{fardaAluno.id_farda_aluno}</td>
                  <td className="p-2">{fardaAluno.aluno?.nome}</td>
                  <td className="p-2">
                    {fardaAluno.fardamento?.tipo} - {fardaAluno.fardamento?.tamanho}
                  </td>
                  <td className="p-2">{formatDate(fardaAluno.data_entrega)}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditFardaAluno(fardaAluno);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 bg-yellow-600 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(fardaAluno.id_farda_aluno)}
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

export default FardaAlunoPage; 