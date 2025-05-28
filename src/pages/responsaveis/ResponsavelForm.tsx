import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Responsavel } from '../../services/responsavelService';

const responsavelSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  telefone: z.string().min(10, 'Telefone inválido'),
  parentesco: z.string().min(2, 'Parentesco é obrigatório'),
});

type ResponsavelFormData = z.infer<typeof responsavelSchema>;

interface ResponsavelFormProps {
  responsavel?: Responsavel | null;
  onSubmit: (data: ResponsavelFormData) => Promise<void>;
  onCancel: () => void;
}

const ResponsavelForm: React.FC<ResponsavelFormProps> = ({
  responsavel,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResponsavelFormData>({
    resolver: zodResolver(responsavelSchema),
    defaultValues: responsavel
      ? {
          nome: responsavel.nome,
          telefone: responsavel.telefone,
          parentesco: responsavel.parentesco,
        }
      : undefined,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
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
        <label htmlFor="telefone" className="block text-sm font-medium mb-1">
          Telefone
        </label>
        <input
          id="telefone"
          type="tel"
          {...register('telefone')}
          className="military-input w-full"
          placeholder="(00) 00000-0000"
        />
        {errors.telefone && (
          <p className="mt-1 text-sm text-danger">{errors.telefone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="parentesco" className="block text-sm font-medium mb-1">
          Parentesco
        </label>
        <input
          id="parentesco"
          type="text"
          {...register('parentesco')}
          className="military-input w-full"
          placeholder="Ex: Pai, Mãe, Tio, etc"
        />
        {errors.parentesco && (
          <p className="mt-1 text-sm text-danger">{errors.parentesco.message}</p>
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

export default ResponsavelForm; 