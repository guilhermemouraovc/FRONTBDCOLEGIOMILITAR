import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  UsersIcon, 
  GraduationCapIcon, 
  BookOpenIcon,
  ClipboardCheckIcon,
  UserIcon,
  ShirtIcon,
  CalendarIcon,
  ClubIcon,
  FileBarChart2Icon,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-primary text-light transition-all duration-300 z-10 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 bg-dark">
        {isOpen && (
          <div className="flex items-center gap-2">
            <GraduationCapIcon className="text-accent" size={24} />
            <span className="font-oswald text-xl tracking-wider text-light">CM SISTEMA</span>
          </div>
        )}
        {!isOpen && <GraduationCapIcon className="text-accent mx-auto" size={24} />}
        <button onClick={toggleSidebar} className="text-light hover:text-accent transition-colors">
          {isOpen ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
        </button>
      </div>

      <nav className="mt-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <HomeIcon size={20} />
          {isOpen && <span>Painel</span>}
        </NavLink>

        <NavLink 
          to="/turmas" 
          className={({ isActive }) => 
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <UsersIcon size={20} />
          {isOpen && <span>Turmas</span>}
        </NavLink>

        <NavLink 
          to="/alunos" 
          className={({ isActive }) => 
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <UserIcon size={20} />
          {isOpen && <span>Alunos</span>}
        </NavLink>

        <NavLink 
          to="/professores" 
          className={({ isActive }) => 
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <GraduationCapIcon size={20} />
          {isOpen && <span>Professores</span>}
        </NavLink>

        <NavLink 
          to="/disciplinas" 
          className={({ isActive }) => 
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <BookOpenIcon size={20} />
          {isOpen && <span>Disciplinas</span>}
        </NavLink>

        <NavLink 
          to="/notas" 
          className={({ isActive }) => 
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <ClipboardCheckIcon size={20} />
          {isOpen && <span>Notas</span>}
        </NavLink>

        <NavLink 
          to="/presenca" 
          className={({ isActive }) => 
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <CalendarIcon size={20} />
          {isOpen && <span>Presença</span>}
        </NavLink>

        <NavLink 
          to="/matriculas" 
          className={({ isActive }) => 
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <FileBarChart2Icon size={20} />
          {isOpen && <span>Matrículas</span>}
        </NavLink>

        <NavLink 
          to="/clube" 
          className={({ isActive }) => 
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <ClubIcon size={20} />
          {isOpen && <span>Clube</span>}
        </NavLink>

        <NavLink 
          to="/fardamento" 
          className={({ isActive }) => 
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <ShirtIcon size={20} />
          {isOpen && <span>Fardamento</span>}
        </NavLink>

        <NavLink 
          to="/relatorios" 
          className={({ isActive }) => 
            `sidebar-item ${isActive ? 'active' : ''}`
          }
        >
          <FileBarChart2Icon size={20} />
          {isOpen && <span>Relatórios</span>}
        </NavLink>
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