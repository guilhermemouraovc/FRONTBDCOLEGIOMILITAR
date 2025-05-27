// src/components/forms/DiretorForm.tsx
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
  ativo: z.boolean().default(true),
});

type DiretorFormData = z.infer<typeof diretorSchema>;

interface DiretorFormProps {
  diretor?: Diretor | null;
  onSubmit: (data: DiretorFormData) => Promise<void>;
  onCancel: () => void;
}

const DiretorForm: React.FC<DiretorFormProps> = ({
  diretor,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DiretorFormData>({
    resolver: zodResolver(diretorSchema),
    defaultValues: diretor
      ? {
          nome: diretor.nome,
          cargo_militar: diretor.cargo_militar,
          telefone: diretor.telefone,
          email: diretor.email,
          ativo: diretor.ativo,
        }
      : { ativo: true },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded shadow"
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
        />
        {errors.nome && (
          <p className="mt-1 text-sm text-danger">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="cargo_militar"
          className="block text-sm font-medium mb-1"
        >
          Cargo Militar
        </label>
        <input
          id="cargo_militar"
          type="text"
          {...register('cargo_militar')}
          className="military-input w-full"
        />
        {errors.cargo_militar && (
          <p className="mt-1 text-sm text-danger">
            {errors.cargo_militar.message}
          </p>
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
        />
        {errors.telefone && (
          <p className="mt-1 text-sm text-danger">{errors.telefone.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="military-input w-full"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-danger">{errors.email.message}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="ativo"
          type="checkbox"
          {...register('ativo')}
          className="h-4 w-4 text-green-700 border-gray-300 rounded"
        />
        <label htmlFor="ativo" className="text-sm font-medium">
          Ativo
        </label>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
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

export default DiretorForm;
