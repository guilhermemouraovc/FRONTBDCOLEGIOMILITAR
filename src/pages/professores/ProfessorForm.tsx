import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Professor } from '../../services/professorService';
import { crud } from '../../services/api';

const professorSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  id_turma: z.number().min(1, 'Turma é obrigatória'),
  id_diretor: z.number().min(1, 'Diretor é obrigatório'),
});

type ProfessorFormData = z.infer<typeof professorSchema>;

interface ProfessorFormProps {
  professor?: Professor | null;
  onSubmit: (data: ProfessorFormData) => Promise<void>;
  onCancel: () => void;
}

const ProfessorForm: React.FC<ProfessorFormProps> = ({
  professor,
  onSubmit,
  onCancel,
}) => {
  const [turmas, setTurmas] = useState<Array<{ id_turma: number; ano_escolar: string }>>([]);
  const [diretores, setDiretores] = useState<Array<{ id_diretor: number; nome: string }>>([]);

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        const [turmasRes, diretoresRes] = await Promise.all([
          crud.list('/turmas'),
          crud.list('/diretores')
        ]);
        setTurmas(turmasRes);
        setDiretores(diretoresRes);
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
  } = useForm<ProfessorFormData>({
    resolver: zodResolver(professorSchema),
    defaultValues: professor
      ? {
          nome: professor.nome,
          id_turma: professor.id_turma,
          id_diretor: professor.id_diretor,
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
        <label htmlFor="id_diretor" className="block text-sm font-medium mb-1">
          Diretor Responsável
        </label>
        <select
          id="id_diretor"
          {...register('id_diretor', { valueAsNumber: true })}
          className="military-select w-full"
        >
          <option value="">Selecione...</option>
          {diretores.map((diretor) => (
            <option key={diretor.id_diretor} value={diretor.id_diretor}>
              {diretor.nome}
            </option>
          ))}
        </select>
        {errors.id_diretor && (
          <p className="mt-1 text-sm text-danger">{errors.id_diretor.message}</p>
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

export default ProfessorForm; 