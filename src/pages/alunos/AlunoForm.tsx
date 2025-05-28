import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Aluno } from '../../services/alunoService';
import { crud } from '../../services/api';

const alunoSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  data_nasc: z.string().min(1, 'Data de nascimento é obrigatória'),
  sexo: z.string().min(1, 'Sexo é obrigatório'),
  id_turma: z.number().min(1, 'Turma é obrigatória'),
  id_responsavel: z.number().min(1, 'Responsável é obrigatório'),
});

type AlunoFormData = z.infer<typeof alunoSchema>;

interface AlunoFormProps {
  aluno?: Aluno | null;
  onSubmit: (data: AlunoFormData) => Promise<void>;
  onCancel: () => void;
}

const AlunoForm: React.FC<AlunoFormProps> = ({
  aluno,
  onSubmit,
  onCancel,
}) => {
  const [turmas, setTurmas] = useState<Array<{ id_turma: number; ano_escolar: string }>>([]);
  const [responsaveis, setResponsaveis] = useState<Array<{ id: number; nome: string }>>([]);

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        const [turmasRes, responsaveisRes] = await Promise.all([
          crud.list('/turmas'),
          crud.list('/responsaveis')
        ]);
        setTurmas(turmasRes);
        setResponsaveis(responsaveisRes);
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
  } = useForm<AlunoFormData>({
    resolver: zodResolver(alunoSchema),
    defaultValues: aluno
      ? {
          nome: aluno.nome,
          data_nasc: aluno.data_nasc,
          sexo: aluno.sexo,
          id_turma: aluno.id_turma,
          id_responsavel: aluno.id_responsavel,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium mb-1">
          Nome
        </label>
        <input
          id="nome"
          type="text"
          {...register('nome')}
          className="military-input w-full"
          placeholder="Nome completo"
        />
        {errors.nome && (
          <p className="mt-1 text-sm text-danger">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="data_nasc" className="block text-sm font-medium mb-1">
          Data de Nascimento
        </label>
        <input
          id="data_nasc"
          type="date"
          {...register('data_nasc')}
          className="military-input w-full"
        />
        {errors.data_nasc && (
          <p className="mt-1 text-sm text-danger">{errors.data_nasc.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="sexo" className="block text-sm font-medium mb-1">
          Sexo
        </label>
        <select
          id="sexo"
          {...register('sexo')}
          className="military-select w-full"
        >
          <option value="">Selecione...</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
        {errors.sexo && (
          <p className="mt-1 text-sm text-danger">{errors.sexo.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="id_turma" className="block text-sm font-medium mb-1">
          Turma
        </label>
        <select
          id="id_turma"
          {...register('id_turma', { valueAsNumber: true })}
          className="military-select w-full"
        >
          <option value="">Selecione...</option>
          {turmas.map((turma) => (
            <option key={turma.id_turma} value={turma.id_turma}>
              {turma.ano_escolar}
            </option>
          ))}
        </select>
        {errors.id_turma && (
          <p className="mt-1 text-sm text-danger">{errors.id_turma.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="id_responsavel" className="block text-sm font-medium mb-1">
          Responsável
        </label>
        <select
          id="id_responsavel"
          {...register('id_responsavel', { valueAsNumber: true })}
          className="military-select w-full"
        >
          <option value="">Selecione...</option>
          {responsaveis.map((responsavel) => (
            <option key={responsavel.id} value={responsavel.id}>
              {responsavel.nome}
            </option>
          ))}
        </select>
        {errors.id_responsavel && (
          <p className="mt-1 text-sm text-danger">{errors.id_responsavel.message}</p>
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

export default AlunoForm; 