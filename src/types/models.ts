// Base interface for common fields
interface BaseModel {
  criado_em: string;
  atualizado_em: string;
  ativo?: boolean;
}

export interface Diretor {
    id_diretor: number;  // com _
    nome: string;
    cargo_militar: string;  // com _
    telefone: string;
    email: string;
    ativo: boolean;
}

export interface Turma extends BaseModel {
  id_turma: number;
  nome_turma: string;
  ano_escolar: string;
  turno: string;
  capacidade: number;
  id_diretor: number;
  diretor?: Diretor;
}

export interface Responsavel extends BaseModel {
  id_responsavel: number;
  nome: string;
  parentesco: string;
  telefone: string;
  email: string;
}

export interface Aluno extends BaseModel {
  id_aluno: number;
  nome: string;
  data_nasc: string;
  sexo: 'M' | 'F';
  id_turma: number;
  id_responsavel: number;
  turma?: Turma;
  responsavel?: Responsavel;
}

export interface Professor extends BaseModel {
  id_professor: number;
  nome: string;
  especialidade: string;
  telefone: string;
  email: string;
  id_turma_resp: number;
  turma?: Turma;
}

export interface Clube extends BaseModel {
  id_clube: number;
  nome: string;
  descricao: string;
}

export interface Disciplina extends BaseModel {
  id_disciplina: number;
  nome: string;
  carga_horaria: number;
  descricao: string;
  id_clube?: number;
  id_nota?: number;
  clube?: Clube;
}

export interface Nota extends BaseModel {
  id_nota: number;
  descricao: string;
  peso: number;
  valor: number;
}

export interface LancamentoNota extends BaseModel {
  id_lanc: number;
  id_aluno: number;
  id_disciplina: number;
  id_nota: number;
  valor: number;
  data_lanc: string;
  aluno?: Aluno;
  disciplina?: Disciplina;
  nota?: Nota;
}

export interface Presenca extends BaseModel {
  id_presenca: number;
  id_aluno: number;
  id_turma: number;
  data_aula: string;
  presente: boolean;
  aluno?: Aluno;
  turma?: Turma;
}

export interface Fardamento extends BaseModel {
  id_farda: number;
  tipo: string;
  tamanho: string;
}

export interface FardaAluno extends BaseModel {
  id_farda_aluno: number;
  id_aluno: number;
  id_farda: number;
  data_entrega: string;
  aluno?: Aluno;
  fardamento?: Fardamento;
}

export interface ClubeAluno extends BaseModel {
  id_clube_aluno: number;
  id_aluno: number;
  id_clube: number;
  data_ingresso: string;
  data_saida?: string;
  aluno?: Aluno;
  clube?: Clube;
}

export interface Matricula extends BaseModel {
  id_matricula: number;
  id_aluno: number;
  id_turma: number;
  ano: number;
  data_matricula: string;
  status: string;
  aluno?: Aluno;
  turma?: Turma;
}