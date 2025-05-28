import React, { useEffect, useState } from 'react';
import { Peso } from '../../services/pesoService';
import { crud } from '../../services/api';
import PesoForm from './PesoForm';

const PesoPage: React.FC = () => {
  const [pesos, setPesos] = useState<Peso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editPeso, setEditPeso] = useState<Peso | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const lista = await crud.list<Peso>('/pesos');
        setPesos(lista);
      } catch {
        setError('Erro ao buscar pesos');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir este peso?')) return;
    try {
      await crud.delete('/pesos', id);
      setPesos(pesos.filter(p => p.id_nota !== id));
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
      <h1 className="text-2xl font-bold mb-4">Pesos das Notas</h1>

      <button
        onClick={() => {
          setEditPeso(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Adicionar Peso
      </button>

      {showForm && (
        <div className="mb-6">
          <PesoForm
            peso={editPeso}
            onSubmit={async (data) => {
              if (editPeso) {
                // UPDATE
                await crud.update<Peso, Peso>(
                  '/pesos',
                  editPeso.id_nota,
                  data
                );
              } else {
                // CREATE
                await crud.create<Peso>('/pesos', data);
              }
              // Recarrega lista e fecha form
              const lista = await crud.list<Peso>('/pesos');
              setPesos(lista);
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
                <th className="p-2">Descrição</th>
                <th className="p-2">Peso</th>
                <th className="p-2">Criado em</th>
                <th className="p-2">Atualizado em</th>
                <th className="p-2">Valor</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {pesos.map(peso => (
                <tr key={peso.id_nota} className="border-b">
                  <td className="p-2">{peso.id_nota}</td>
                  <td className="p-2">{peso.descricao}</td>
                  <td className="p-2">{peso.peso}</td>
                  <td className="p-2">{formatDate(peso.criado_em)}</td>
                  <td className="p-2">{formatDate(peso.atualizado_em)}</td>
                  <td className="p-2">{peso.valor}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditPeso(peso);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 bg-yellow-600 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(peso.id_nota)}
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

export default PesoPage; 