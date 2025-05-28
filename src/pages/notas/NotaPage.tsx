import React, { useEffect, useState } from 'react';
import { Peso } from '../../services/pesoService';
import { crud } from '../../services/api';

const NotaPage: React.FC = () => {
  const [pesos, setPesos] = useState<Peso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const pesosLista = await crud.list<Peso>('/pesos');
        setPesos(pesosLista);
      } catch {
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notas</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pesos das Avaliações</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white mb-6">
              <thead>
                <tr className="bg-green-800 text-white">
                  <th className="p-2">ID</th>
                  <th className="p-2">Descrição</th>
                  <th className="p-2">Peso</th>
                  <th className="p-2">Criado em</th>
                  <th className="p-2">Atualizado em</th>
                  <th className="p-2">Valor</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotaPage; 