import React, { useEffect, useState } from 'react';
import { Aluno } from '../../services/alunoService';
import { crud } from '../../services/api';
import AlunoForm from './AlunoForm';

const AlunoPage: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editAluno, setEditAluno] = useState<Aluno | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const lista = await crud.list<Aluno>('/alunos');
        setAlunos(lista);
      } catch {
        setError('Erro ao buscar alunos');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Excluir este aluno?')) return;
    try {
      await crud.delete('/alunos', id);
      setAlunos(alunos.filter(a => a.id_aluno !== id));
    } catch {
      alert('Não foi possível excluir');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Alunos</h1>

      <button
        onClick={() => {
          setEditAluno(null);
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Adicionar Aluno
      </button>

      {showForm && (
        <div className="mb-6">
          <AlunoForm
            aluno={editAluno}
            onSubmit={async (data) => {
              if (editAluno) {
                // UPDATE
                await crud.update<Aluno, Aluno>(
                  '/alunos',
                  editAluno.id_aluno,
                  data
                );
              } else {
                // CREATE
                await crud.create<Aluno>('/alunos', data);
              }
              // Recarrega lista e fecha form
              const lista = await crud.list<Aluno>('/alunos');
              setAlunos(lista);
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
                <th className="p-2">Data Nasc.</th>
                <th className="p-2">Sexo</th>
                <th className="p-2">Turma</th>
                <th className="p-2">Responsável</th>
                <th className="p-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map(a => (
                <tr key={a.id_aluno} className="border-b">
                  <td className="p-2">{a.id_aluno}</td>
                  <td className="p-2">{a.nome}</td>
                  <td className="p-2">{formatDate(a.data_nasc)}</td>
                  <td className="p-2">{a.sexo === 'M' ? 'Masculino' : 'Feminino'}</td>
                  <td className="p-2">{a.turma?.ano_escolar}</td>
                  <td className="p-2">{a.responsavel?.nome}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => {
                        setEditAluno(a);
                        setShowForm(true);
                      }}
                      className="px-3 py-1 bg-yellow-600 text-white rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(a.id_aluno)}
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

export default AlunoPage; 