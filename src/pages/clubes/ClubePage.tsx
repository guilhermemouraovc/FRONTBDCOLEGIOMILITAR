import React, { useEffect, useState } from 'react';
import { Clube } from '../../services/clubeService';
import { crud } from '../../services/api';
import ClubeForm from './ClubeForm';

const ClubePage: React.FC = () => {
  const [clubes, setClubes] = useState<Clube[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editClube, setEditClube] = useState<Clube | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const lista = await crud.list<Clube>('/clubes');
        setClubes(lista);
      } catch {
        setError('Erro ao buscar clubes');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir este clube?')) return;
    try {
      await crud.delete('/clubes', id);
      setClubes(clubes.filter(c => c.id_clube !== id));
    } catch {
      alert('Não foi possível excluir');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clubes</h1>

      <button
        onClick={() => {
          setEditClube(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Adicionar Clube
      </button>

      {showForm && (
        <div className="mb-6">
          <ClubeForm
            clube={editClube}
            onSubmit={async (data) => {
              if (editClube) {
                // UPDATE
                await crud.update<Clube, Clube>(
                  '/clubes',
                  editClube.id_clube,
                  data
                );
              } else {
                // CREATE
                await crud.create<Clube>('/clubes', data);
              }
              // Recarrega lista e fecha form
              const lista = await crud.list<Clube>('/clubes');
              setClubes(lista);
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
                <th className="p-2">Descrição</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clubes.map(clube => (
                <tr key={clube.id_clube} className="border-b">
                  <td className="p-2">{clube.id_clube}</td>
                  <td className="p-2">{clube.nome}</td>
                  <td className="p-2">{clube.descricao}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditClube(clube);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 bg-yellow-600 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(clube.id_clube)}
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

export default ClubePage; 