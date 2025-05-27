import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon,
  Users2Icon,
  GraduationCapIcon,
  BookOpenIcon,
  ClipboardCheckIcon,
  UserIcon,
  ShirtIcon,
  CalendarIcon,
  ClubIcon,
  FileBarChart2Icon,
  ChevronsLeft,
  ChevronsRight,
  ShieldIcon,
  UsersIcon,
  HeartHandshakeIcon,
  BookmarkIcon,
  ScrollIcon,
  CheckSquareIcon
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { path: '/', icon: HomeIcon, label: 'Painel' },
    { path: '/diretores', icon: ShieldIcon, label: 'Diretores' },
    { path: '/turmas', icon: Users2Icon, label: 'Turmas' },
    { path: '/responsaveis', icon: HeartHandshakeIcon, label: 'Responsáveis' },
    { path: '/alunos', icon: UserIcon, label: 'Alunos' },
    { path: '/professores', icon: GraduationCapIcon, label: 'Professores' },
    { path: '/clubes', icon: ClubIcon, label: 'Clubes' },
    { path: '/disciplinas', icon: BookOpenIcon, label: 'Disciplinas' },
    { path: '/notas', icon: ScrollIcon, label: 'Notas' },
    { path: '/lancamentos-nota', icon: ClipboardCheckIcon, label: 'Lançamento de Nota' },
    { path: '/presencas', icon: CalendarIcon, label: 'Presenças' },
    { path: '/fardamentos', icon: ShirtIcon, label: 'Fardamentos' },
    { path: '/farda-aluno', icon: BookmarkIcon, label: 'Farda-Aluno' },
    { path: '/clube-aluno', icon: UsersIcon, label: 'Clube-Aluno' },
    { path: '/matriculas', icon: CheckSquareIcon, label: 'Matrículas' }
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-primary text-light transition-all duration-300 z-10 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 bg-dark">
        {isOpen && (
          <div className="flex items-center gap-2">
            <GraduationCapIcon className="text-accent\" size={24} />
            <span className="font-oswald text-xl tracking-wider text-light">CM SISTEMA</span>
          </div>
        )}
        {!isOpen && <GraduationCapIcon className="text-accent mx-auto" size={24} />}
        <button onClick={toggleSidebar} className="text-light hover:text-accent transition-colors">
          {isOpen ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
        </button>
      </div>

      <nav className="mt-4 overflow-y-auto h-[calc(100vh-4rem)]">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path}
            to={item.path} 
            className={({ isActive }) => 
              `sidebar-item ${isActive ? 'active' : ''}`
            }
          >
            <item.icon size={20} />
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-dark/30">
        {isOpen && (
          <div className="text-xs text-center text-light/70">
            &copy; 2025 Colégio Militar
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;