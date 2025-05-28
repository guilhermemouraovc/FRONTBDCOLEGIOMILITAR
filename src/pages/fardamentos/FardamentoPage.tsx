import React, { useEffect, useState } from 'react';
import { Fardamento } from '../../services/fardamentoService';
import { crud } from '../../services/api';
import FardamentoForm from './FardamentoForm';

const FardamentoPage: React.FC = () => {
  const [fardamentos, setFardamentos] = useState<Fardamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editFardamento, setEditFardamento] = useState<Fardamento | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const lista = await crud.list<Fardamento>('/fardamentos');
        setFardamentos(lista);
      } catch {
        setError('Erro ao buscar fardamentos');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir este fardamento?')) return;
    try {
      await crud.delete('/fardamentos', id);
      setFardamentos(fardamentos.filter(f => f.id_fardamento !== id));
    } catch {
      alert('Não foi possível excluir');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fardamentos</h1>

      <button
        onClick={() => {
          setEditFardamento(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Adicionar Fardamento
      </button>

      {showForm && (
        <div className="mb-6">
          <FardamentoForm
            fardamento={editFardamento}
            onSubmit={async (data) => {
              if (editFardamento) {
                // UPDATE
                await crud.update<Fardamento, Fardamento>(
                  '/fardamentos',
                  editFardamento.id_fardamento,
                  data
                );
              } else {
                // CREATE
                await crud.create<Fardamento>('/fardamentos', data);
              }
              // Recarrega lista e fecha form
              const lista = await crud.list<Fardamento>('/fardamentos');
              setFardamentos(lista);
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
                <th className="p-2">Tipo</th>
                <th className="p-2">Tamanho</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {fardamentos.map(fardamento => (
                <tr key={fardamento.id_fardamento} className="border-b">
                  <td className="p-2">{fardamento.id_fardamento}</td>
                  <td className="p-2">{fardamento.tipo}</td>
                  <td className="p-2">{fardamento.tamanho}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditFardamento(fardamento);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 bg-yellow-600 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(fardamento.id_fardamento)}
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

export default FardamentoPage; 