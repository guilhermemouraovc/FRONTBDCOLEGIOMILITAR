import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Turma } from '../../services/turmaService';

const turmaSchema = z.object({
  ano_escolar: z.string().min(1, 'Ano escolar é obrigatório'),
});

type TurmaFormData = z.infer<typeof turmaSchema>;

interface TurmaFormProps {
  turma?: Turma | null;
  onSubmit: (data: TurmaFormData) => Promise<void>;
  onCancel: () => void;
}

const TurmaForm: React.FC<TurmaFormProps> = ({
  turma,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TurmaFormData>({
    resolver: zodResolver(turmaSchema),
    defaultValues: turma
      ? {
          ano_escolar: turma.ano_escolar,
        }
      : undefined,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label htmlFor="ano_escolar" className="block text-sm font-medium mb-1">
          Ano Escolar
        </label>
        <input
          id="ano_escolar"
          type="text"
          {...register('ano_escolar')}
          className="military-input w-full"
          placeholder="Ex: 1º Ano"
        />
        {errors.ano_escolar && (
          <p className="mt-1 text-sm text-danger">{errors.ano_escolar.message}</p>
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

export default TurmaForm; 