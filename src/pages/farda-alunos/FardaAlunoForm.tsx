import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FardaAluno } from '../../services/fardaAlunoService';
import { crud } from '../../services/api';

interface Aluno {
  id_aluno: number;
  nome: string;
}

interface Fardamento {
  id_fardamento: number;
  tipo: string;
  tamanho: string;
}

const fardaAlunoSchema = z.object({
  id_aluno: z.number().min(1, 'Selecione um aluno'),
  id_farda: z.number().min(1, 'Selecione um fardamento'),
  data_entrega: z.string().min(1, 'Data de entrega é obrigatória'),
});

type FardaAlunoFormData = z.infer<typeof fardaAlunoSchema>;

interface FardaAlunoFormProps {
  fardaAluno?: FardaAluno | null;
  onSubmit: (data: FardaAlunoFormData) => Promise<void>;
  onCancel: () => void;
}

const FardaAlunoForm: React.FC<FardaAlunoFormProps> = ({
  fardaAluno,
  onSubmit,
  onCancel,
}) => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [fardamentos, setFardamentos] = useState<Fardamento[]>([]);

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        const [alunosData, fardamentosData] = await Promise.all([
          crud.list<Aluno>('/alunos'),
          crud.list<Fardamento>('/fardamentos'),
        ]);
        setAlunos(alunosData);
        setFardamentos(fardamentosData);
      } catch (error) {
        console.error('Erro ao carregar dependências:', error);
      }
    };
    loadDependencies();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FardaAlunoFormData>({
    resolver: zodResolver(fardaAlunoSchema),
    defaultValues: fardaAluno
      ? {
          id_aluno: fardaAluno.id_aluno,
          id_farda: fardaAluno.id_farda,
          data_entrega: fardaAluno.data_entrega.split('T')[0], // Formata a data para YYYY-MM-DD
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="id_aluno" className="block text-sm font-medium mb-1">
          Aluno
        </label>
        <select
          id="id_aluno"
          {...register('id_aluno', { valueAsNumber: true })}
          className="military-select w-full"
        >
          <option value="">Selecione...</option>
          {alunos.map((aluno) => (
            <option key={aluno.id_aluno} value={aluno.id_aluno}>
              {aluno.nome}
            </option>
          ))}
        </select>
        {errors.id_aluno && (
          <p className="mt-1 text-sm text-danger">{errors.id_aluno.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="id_farda" className="block text-sm font-medium mb-1">
          Fardamento
        </label>
        <select
          id="id_farda"
          {...register('id_farda', { valueAsNumber: true })}
          className="military-select w-full"
        >
          <option value="">Selecione...</option>
          {fardamentos.map((fardamento) => (
            <option key={fardamento.id_fardamento} value={fardamento.id_fardamento}>
              {`${fardamento.tipo} - Tamanho ${fardamento.tamanho}`}
            </option>
          ))}
        </select>
        {errors.id_farda && (
          <p className="mt-1 text-sm text-danger">{errors.id_farda.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="data_entrega" className="block text-sm font-medium mb-1">
          Data de Entrega
        </label>
        <input
          id="data_entrega"
          type="date"
          {...register('data_entrega')}
          className="military-input w-full"
        />
        {errors.data_entrega && (
          <p className="mt-1 text-sm text-danger">{errors.data_entrega.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="btn bg-dark/10 hover:bg-dark/20 text-dark"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export default FardaAlunoForm; 