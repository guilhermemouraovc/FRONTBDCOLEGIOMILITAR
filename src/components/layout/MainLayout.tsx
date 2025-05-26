import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const sidebarWidth = sidebarOpen ? 256 : 64;

  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className="flex flex-col flex-1 transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <Header sidebarWidth={sidebarWidth} />
        
        <main className="flex-1 p-6 mt-16">
          <Outlet />
        </main>
        
        <footer className="py-4 px-6 text-center text-sm text-dark/60 border-t border-primary/10">
          &copy; 2025 Colégio Militar - Todos os direitos reservados
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;