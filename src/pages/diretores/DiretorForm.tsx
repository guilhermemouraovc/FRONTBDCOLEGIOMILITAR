import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Diretor } from '../../types/models';

const diretorSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  cargo_militar: z.string().min(2, 'Cargo militar é obrigatório'),
  telefone: z.string().min(10, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
  ativo: z.boolean().default(true)
});

type DiretorFormData = z.infer<typeof diretorSchema>;

interface DiretorFormProps {
  diretor?: Diretor | null;
  onSubmit: (data: DiretorFormData) => Promise<void>;
  onCancel: () => void;
}

const DiretorForm: React.FC<DiretorFormProps> = ({ diretor, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<DiretorFormData>({
    resolver: zodResolver(diretorSchema),
    defaultValues: diretor || {
      ativo: true
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-dark mb-1">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          className="military-input w-full"
          {...register('nome')}
        />
        {errors.nome && (
          <p className="mt-1 text-sm text-danger">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="cargo_militar" className="block text-sm font-medium text-dark mb-1">
          Cargo Militar
        </label>
        <input
          type="text"
          id="cargo_militar"
          className="military-input w-full"
          {...register('cargo_militar')}
        />
        {errors.cargo_militar && (
          <p className="mt-1 text-sm text-danger">{errors.cargo_militar.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="telefone" className="block text-sm font-medium text-dark mb-1">
          Telefone
        </label>
        <input
          type="tel"
          id="telefone"
          className="military-input w-full"
          {...register('telefone')}
        />
        {errors.telefone && (
          <p className="mt-1 text-sm text-danger">{errors.telefone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="military-input w-full"
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-danger">{errors.email.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="ativo"
          className="rounded border-primary/30 text-primary focus:ring-primary"
          {...register('ativo')}
        />
        <label htmlFor="ativo" className="text-sm font-medium text-dark">
          Ativo
        </label>
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
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export default DiretorForm;