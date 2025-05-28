import React, { useEffect, useState } from 'react';
import { Nota } from '../../services/notaService';
import { crud } from '../../services/api';
import NotaForm from '../notas/NotaForm';

const LancamentoNotaPage: React.FC = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editNota, setEditNota] = useState<Nota | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const lista = await crud.list<Nota>('/notas');
        setNotas(lista);
      } catch {
        setError('Erro ao buscar notas');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir esta nota?')) return;
    try {
      await crud.delete('/notas', id);
      setNotas(notas.filter(n => n.id_nota !== id));
    } catch {
      alert('Não foi possível excluir');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lançamento de Notas</h1>

      <button
        onClick={() => {
          setEditNota(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Adicionar Nota
      </button>

      {showForm && (
        <div className="mb-6">
          <NotaForm
            nota={editNota}
            onSubmit={async (data) => {
              if (editNota) {
                // UPDATE
                await crud.update<Nota, Nota>(
                  '/notas',
                  editNota.id_nota,
                  data
                );
              } else {
                // CREATE
                await crud.create<Nota>('/notas', data);
              }
              // Recarrega lista e fecha form
              const lista = await crud.list<Nota>('/notas');
              setNotas(lista);
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
                <th className="p-2">Disciplina</th>
                <th className="p-2">Tipo</th>
                <th className="p-2">Valor</th>
                <th className="p-2">Data</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {notas.map(nota => (
                <tr key={nota.id_nota} className="border-b">
                  <td className="p-2">{nota.id_nota}</td>
                  <td className="p-2">{nota.aluno?.nome}</td>
                  <td className="p-2">{nota.disciplina?.nome}</td>
                  <td className="p-2">{nota.tipo}</td>
                  <td className="p-2">{nota.valor}</td>
                  <td className="p-2">{formatDate(nota.data)}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditNota(nota);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 bg-yellow-600 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(nota.id_nota)}
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

export default LancamentoNotaPage; 