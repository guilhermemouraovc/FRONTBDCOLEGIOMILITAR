import React, { useEffect, useState } from 'react';
import { Responsavel } from '../../services/responsavelService';
import { crud } from '../../services/api';
import ResponsavelForm from './ResponsavelForm';

const ResponsavelPage: React.FC = () => {
  const [responsaveis, setResponsaveis] = useState<Responsavel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editResponsavel, setEditResponsavel] = useState<Responsavel | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const lista = await crud.list<Responsavel>('/responsaveis');
        setResponsaveis(lista);
      } catch {
        setError('Erro ao buscar responsáveis');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir este responsável?')) return;
    try {
      await crud.delete('/responsaveis', id);
      setResponsaveis(responsaveis.filter(r => r.id !== id));
    } catch {
      alert('Não foi possível excluir');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Responsáveis</h1>

      <button
        onClick={() => {
          setEditResponsavel(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Adicionar Responsável
      </button>

      {showForm && (
        <div className="mb-6">
          <ResponsavelForm
            responsavel={editResponsavel}
            onSubmit={async (data) => {
              if (editResponsavel) {
                // UPDATE
                await crud.update<Responsavel, Responsavel>(
                  '/responsaveis',
                  editResponsavel.id,
                  data
                );
              } else {
                // CREATE
                await crud.create<Responsavel>('/responsaveis', data);
              }
              // Recarrega lista e fecha form
              const lista = await crud.list<Responsavel>('/responsaveis');
              setResponsaveis(lista);
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
              <th className="p-2">Nome</th>
              <th className="p-2">Telefone</th>
              <th className="p-2">Parentesco</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {responsaveis.map(r => (
              <tr key={r.id} className="border-b">
                <td className="p-2">{r.id}</td>
                <td className="p-2">{r.nome}</td>
                <td className="p-2">{r.telefone}</td>
                <td className="p-2">{r.parentesco}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditResponsavel(r);
                      setShowForm(true);
                    }}
                    className="px-3 py-1 bg-yellow-600 text-white rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
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

export default ResponsavelPage; 