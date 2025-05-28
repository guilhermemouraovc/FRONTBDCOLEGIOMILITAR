import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Fardamento } from '../../services/fardamentoService';

const TIPOS_FARDAMENTO = [
  'Uniforme de Gala',
  'Uniforme de Educação Física',
  'Uniforme Diário',
  'Uniforme de Campo',
] as const;

const TAMANHOS = ['P', 'M', 'G', 'GG'] as const;

const fardamentoSchema = z.object({
  tipo: z.enum(TIPOS_FARDAMENTO, {
    errorMap: () => ({ message: 'Selecione um tipo de fardamento' }),
  }),
  tamanho: z.enum(TAMANHOS, {
    errorMap: () => ({ message: 'Selecione um tamanho válido' }),
  }),
});

type FardamentoFormData = z.infer<typeof fardamentoSchema>;

interface FardamentoFormProps {
  fardamento?: Fardamento | null;
  onSubmit: (data: FardamentoFormData) => Promise<void>;
  onCancel: () => void;
}

const FardamentoForm: React.FC<FardamentoFormProps> = ({
  fardamento,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FardamentoFormData>({
    resolver: zodResolver(fardamentoSchema),
    defaultValues: fardamento
      ? {
          tipo: fardamento.tipo as any,
          tamanho: fardamento.tamanho as any,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="tipo" className="block text-sm font-medium mb-1">
          Tipo de Fardamento
        </label>
        <select
          id="tipo"
          {...register('tipo')}
          className="military-select w-full"
        >
          <option value="">Selecione...</option>
          {TIPOS_FARDAMENTO.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
        {errors.tipo && (
          <p className="mt-1 text-sm text-danger">{errors.tipo.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tamanho" className="block text-sm font-medium mb-1">
          Tamanho
        </label>
        <select
          id="tamanho"
          {...register('tamanho')}
          className="military-select w-full"
        >
          <option value="">Selecione...</option>
          {TAMANHOS.map((tamanho) => (
            <option key={tamanho} value={tamanho}>
              {tamanho}
            </option>
          ))}
        </select>
        {errors.tamanho && (
          <p className="mt-1 text-sm text-danger">{errors.tamanho.message}</p>
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

export default FardamentoForm; 