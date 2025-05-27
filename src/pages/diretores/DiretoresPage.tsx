// src/pages/diretores/DiretoresPage.tsx
import React, { useEffect, useState } from 'react';
import { Diretor } from '../../types/models';
import api, { crud } from '../../services/api';
import DiretorForm from '../../components/forms/DiretorForm';

const DiretoresPage: React.FC = () => {
  const [diretores, setDiretores] = useState<Diretor[]>([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string>();
  const [showForm, setShowForm]   = useState(false);
  const [editDiretor, setEditDiretor] = useState<Diretor|null>(null);

  // 1) Carrega a lista de diretores
  const loadDiretores = async () => {
    setLoading(true);
    try {
      const lista = await crud.list<Diretor>('/diretores');
      setDiretores(lista);
    } catch (e) {
      setError('Erro ao buscar diretores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiretores();
  }, []);

  // 2) Criar ou atualizar
  const handleSave = async (data: any) => {
    try {
      if (editDiretor) {
        // PUT /diretores/{id}
        await crud.update<Diretor>('/diretores', editDiretor.id_diretor, {
          nome: data.nome,
          cargo_militar: data.cargo_militar,
          telefone: data.telefone,
          email: data.email,
          ativo: data.ativo
        });
      } else {
        // POST /diretores
        await crud.create<Diretor>('/diretores', {
          nome: data.nome,
          cargo_militar: data.cargo_militar,
          telefone: data.telefone,
          email: data.email,
          ativo: data.ativo
        });
      }
      setShowForm(false);
      setEditDiretor(null);
      await loadDiretores();
    } catch {
      setError('Erro ao salvar diretor');
    }
  };

  // 3) Preparar edição
  const handleEdit = (d: Diretor) => {
    setEditDiretor(d);
    setShowForm(true);
  };

  // 4) Excluir
  const handleDelete = async (d: Diretor) => {
    if (!window.confirm(`Excluir diretor "${d.nome}"?`)) return;
    try {
      await crud.delete('/diretores', d.id_diretor);
      await loadDiretores();
    } catch {
      setError('Erro ao excluir diretor');
    }
  };

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Diretores</h1>
        <button
          className="btn btn-primary"
          onClick={() => { setShowForm(true); setEditDiretor(null); }}
        >
          Adicionar Diretor
        </button>
      </header>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <div>Carregando...</div>}

      {!loading && !showForm && (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="p-2">ID</th>
              <th className="p-2">Nome</th>
              <th className="p-2">Cargo Militar</th>
              <th className="p-2">Telefone</th>
              <th className="p-2">Email</th>
              <th className="p-2">Ativo</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {diretores.map(d => (
              <tr key={d.id_diretor} className="border-b">
                <td className="p-2">{d.id_diretor}</td>
                <td className="p-2">{d.nome}</td>
                <td className="p-2">{d.cargo_militar}</td>
                <td className="p-2">{d.telefone}</td>
                <td className="p-2">{d.email}</td>
                <td className="p-2">{d.ativo ? 'Sim' : 'Não'}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => handleEdit(d)} className="btn btn-sm btn-secondary">Editar</button>
                  <button onClick={() => handleDelete(d)} className="btn btn-sm btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
            {diretores.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center">Nenhum diretor cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="mt-6">
          <DiretorForm
            diretor={editDiretor}
            onSubmit={handleSave}
            onCancel={() => { setShowForm(false); setEditDiretor(null); }}
          />
        </div>
      )}
    </div>
  );
};

export default DiretoresPage;
