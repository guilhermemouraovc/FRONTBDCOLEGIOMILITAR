import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Nota } from '../../services/notaService';

const notaSchema = z.object({
  valor: z.number()
    .min(0, 'A nota não pode ser negativa')
    .max(10, 'A nota não pode ser maior que 10'),
});

type NotaFormData = z.infer<typeof notaSchema>;

interface NotaFormProps {
  nota?: Nota | null;
  onSubmit: (data: NotaFormData) => Promise<void>;
  onCancel: () => void;
}

const NotaForm: React.FC<NotaFormProps> = ({
  nota,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NotaFormData>({
    resolver: zodResolver(notaSchema),
    defaultValues: nota
      ? {
          valor: nota.valor,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="valor" className="block text-sm font-medium mb-1">
          Valor da Nota
        </label>
        <input
          id="valor"
          type="number"
          step="0.1"
          min="0"
          max="10"
          {...register('valor', { valueAsNumber: true })}
          className="military-input w-full"
          placeholder="Ex: 8.5"
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

export default NotaForm; 