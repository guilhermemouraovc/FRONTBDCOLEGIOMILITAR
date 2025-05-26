import React from 'react';
import { BellIcon, LogOutIcon, UserIcon } from 'lucide-react';
import { logout, getCurrentUser } from '../../services/authService';

interface HeaderProps {
  sidebarWidth: number;
}

const Header: React.FC<HeaderProps> = ({ sidebarWidth }) => {
  const user = getCurrentUser();
  const [showNotifications, setShowNotifications] = React.useState(false);
  
  // Mock notifications
  const notifications = [
    { id: 1, message: 'Fardamentos pendentes para entrega', time: '10min' },
    { id: 2, message: 'Notas do 3º bimestre devem ser lançadas até 30/09', time: '1h' },
    { id: 3, message: '5 alunos com faltas não justificadas', time: '3h' },
  ];

  return (
    <header 
      className="h-16 bg-secondary shadow-md fixed top-0 right-0 flex items-center justify-between px-6 z-10"
      style={{ width: `calc(100% - ${sidebarWidth}px)` }}
    >
      <div className="flex items-center">
        <h1 className="text-light font-oswald text-xl tracking-wider">
          SISTEMA DE GESTÃO EDUCACIONAL
        </h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <button 
            className="text-light relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <BellIcon size={20} />
            <span className="absolute -top-1 -right-1 bg-accent text-dark text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-light shadow-lg rounded-md overflow-hidden z-20">
              <div className="bg-primary text-light p-2 font-semibold">
                Notificações
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => (
                  <div key={notification.id} className="p-3 border-b border-primary/10 hover:bg-accent/10 cursor-pointer">
                    <div className="flex justify-between items-start">
                      <p className="text-dark">{notification.message}</p>
                      <span className="text-xs text-dark/60">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center text-primary hover:text-secondary cursor-pointer">
                Ver todas notificações
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-light">
          <div className="h-9 w-9 rounded-full bg-accent/20 flex items-center justify-center">
            <UserIcon size={20} className="text-light" />
          </div>
          <div>
            <p className="text-sm font-medium leading-none">{user?.nome || 'Usuário'}</p>
            <p className="text-xs text-light/70">{user?.role || 'Administrador'}</p>
          </div>
        </div>
        
        <button 
          className="text-light hover:text-accent transition-colors"
          onClick={logout}
          title="Sair"
        >
          <LogOutIcon size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;