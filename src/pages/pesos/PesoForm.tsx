import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Peso } from '../../services/pesoService';

const pesoSchema = z.object({
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  peso: z.number().min(0, 'Peso deve ser maior ou igual a 0').max(2, 'Peso deve ser menor ou igual a 2'),
  valor: z.number().min(0, 'Valor deve ser maior ou igual a 0').max(200, 'Valor deve ser menor ou igual a 200'),
});

type PesoFormData = z.infer<typeof pesoSchema>;

interface PesoFormProps {
  peso?: Peso | null;
  onSubmit: (data: PesoFormData) => Promise<void>;
  onCancel: () => void;
}

const PesoForm: React.FC<PesoFormProps> = ({
  peso,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PesoFormData>({
    resolver: zodResolver(pesoSchema),
    defaultValues: peso
      ? {
          descricao: peso.descricao,
          peso: peso.peso,
          valor: peso.valor,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="descricao" className="block text-sm font-medium mb-1">
          Descrição
        </label>
        <input
          id="descricao"
          type="text"
          {...register('descricao')}
          className="military-input w-full"
          placeholder="Ex: Prova Bimestral"
        />
        {errors.descricao && (
          <p className="mt-1 text-sm text-danger">{errors.descricao.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="peso" className="block text-sm font-medium mb-1">
          Peso
        </label>
        <input
          id="peso"
          type="number"
          step="0.01"
          {...register('peso', { valueAsNumber: true })}
          className="military-input w-full"
          placeholder="Ex: 1"
        />
        {errors.peso && (
          <p className="mt-1 text-sm text-danger">{errors.peso.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="valor" className="block text-sm font-medium mb-1">
          Valor
        </label>
        <input
          id="valor"
          type="number"
          step="1"
          {...register('valor', { valueAsNumber: true })}
          className="military-input w-full"
          placeholder="Ex: 100"
        />
        {errors.valor && (
          <p className="mt-1 text-sm text-danger">{errors.valor.message}</p>
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

export default PesoForm; 