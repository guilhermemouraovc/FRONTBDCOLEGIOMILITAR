import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Clube } from '../../services/clubeService';

const clubeSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  descricao: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
});

type ClubeFormData = z.infer<typeof clubeSchema>;

interface ClubeFormProps {
  clube?: Clube | null;
  onSubmit: (data: ClubeFormData) => Promise<void>;
  onCancel: () => void;
}

const ClubeForm: React.FC<ClubeFormProps> = ({
  clube,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClubeFormData>({
    resolver: zodResolver(clubeSchema),
    defaultValues: clube
      ? {
          nome: clube.nome,
          descricao: clube.descricao,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium mb-1">
          Nome do Clube
        </label>
        <input
          id="nome"
          type="text"
          {...register('nome')}
          className="military-input w-full"
          placeholder="Ex: Clube de Xadrez"
        />
        {errors.nome && (
          <p className="mt-1 text-sm text-danger">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-medium mb-1">
          Descrição
        </label>
        <textarea
          id="descricao"
          {...register('descricao')}
          className="military-input w-full h-32 resize-none"
          placeholder="Descreva as atividades e objetivos do clube..."
        />
        {errors.descricao && (
          <p className="mt-1 text-sm text-danger">{errors.descricao.message}</p>
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

export default ClubeForm; 