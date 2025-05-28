import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Disciplina } from '../../services/disciplinaService';
import { crud } from '../../services/api';

interface Nota {
  id_nota: number;
  valor: number;
}

const disciplinaSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  id_nota: z.number().min(1, 'Nota é obrigatória'),
  carga_horaria: z.number().min(1, 'Carga horária deve ser maior que 0'),
  descricao: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
});

type DisciplinaFormData = z.infer<typeof disciplinaSchema>;

interface DisciplinaFormProps {
  disciplina?: Disciplina | null;
  onSubmit: (data: DisciplinaFormData) => Promise<void>;
  onCancel: () => void;
}

const DisciplinaForm: React.FC<DisciplinaFormProps> = ({
  disciplina,
  onSubmit,
  onCancel,
}) => {
  const [notas, setNotas] = useState<Nota[]>([]);

  useEffect(() => {
    const loadNotas = async () => {
      try {
        const notasData = await crud.list<Nota>('/notas');
        setNotas(notasData);
      } catch (error) {
        console.error('Erro ao carregar notas:', error);
      }
    };
    loadNotas();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DisciplinaFormData>({
    resolver: zodResolver(disciplinaSchema),
    defaultValues: disciplina
      ? {
          nome: disciplina.nome,
          id_nota: disciplina.id_nota,
          carga_horaria: disciplina.carga_horaria,
          descricao: disciplina.descricao,
        }
      : undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium mb-1">
          Nome da Disciplina
        </label>
        <input
          id="nome"
          type="text"
          {...register('nome')}
          className="military-input w-full"
          placeholder="Ex: Matemática"
        />
        {errors.nome && (
          <p className="mt-1 text-sm text-danger">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="id_nota" className="block text-sm font-medium mb-1">
          Nota
        </label>
        <select
          id="id_nota"
          {...register('id_nota', { valueAsNumber: true })}
          className="military-select w-full"
        >
          <option value="">Selecione...</option>
          {notas.map((nota) => (
            <option key={nota.id_nota} value={nota.id_nota}>
              {nota.valor}
            </option>
          ))}
        </select>
        {errors.id_nota && (
          <p className="mt-1 text-sm text-danger">{errors.id_nota.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="carga_horaria" className="block text-sm font-medium mb-1">
          Carga Horária
        </label>
        <input
          id="carga_horaria"
          type="number"
          {...register('carga_horaria', { valueAsNumber: true })}
          className="military-input w-full"
          placeholder="Ex: 60"
          min="1"
        />
        {errors.carga_horaria && (
          <p className="mt-1 text-sm text-danger">{errors.carga_horaria.message}</p>
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
          placeholder="Descreva os objetivos e conteúdos da disciplina..."
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

export default DisciplinaForm; 