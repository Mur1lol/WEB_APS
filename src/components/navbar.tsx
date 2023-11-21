// components/Navbar.tsx

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useRef, useState } from 'react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  const handleMenuToggle = () => {
    setMenuAberto(!menuAberto);
  };

  const handleLogout = () => {
    logout();
    setMenuAberto(false);
  };

  useEffect(() => {
    const handleCloseMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };

    document.addEventListener('mousedown', handleCloseMenu);

    return () => {
      document.removeEventListener('mousedown', handleCloseMenu);
    };
  }, []);

  const renderUserOptions = () => {
    switch (user?.tipo) {
      case 'cliente':
        return (
          <>
            <li><Link className='title' href={'/agendar'}>Agendar Serviço</Link></li>
            <li><Link className='title' href={'/historico'}>Historico</Link></li>

          </>
        );
      case 'funcionario':
        return (
          <>
            <li><Link className='title' href={'/agendamentos'}>Agendamentos</Link></li>
            <li><Link className='title' href={'/meu_relatorio'}>Meu Relatorio</Link></li>

          </>
        );
      case 'admin':
        return (
          <>
            <li><Link className='title' href={'/cadastrar/funcionario'}>Cadastrar Funcionario</Link></li>
            <li><Link className='title' href={'/relatorio'}>Relatorio</Link></li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <header id="header" className="scroll">
      <nav className="container">
        <a className="logo" href="/">beauty<span>salon</span>.</a>
        <div className="menu">
          <ul className="grid">
            <li><a className="title" href="/#home">Início</a></li>
            <li><a className="title" href="/#about">Sobre</a></li>
            <li><a className="title" href="/#services">Serviços</a></li>
            <li><a className="title" href="/#testimonials">Depoimentos</a></li>
            <li><a className="title" href="/#contact">Contato</a></li>

            {renderUserOptions()}

            {/* Botão de Login/Logout */}
            {user?.tipo ? (
              <li>
                <div className="relative inline-block text-left" ref={menuRef}>
                  <div
                    onClick={handleMenuToggle}
                    className="cursor-pointer inline-flex items-center font-medium text-gray-700 hover:text-gray-900 relative"
                  >
                    {user?.nome}
                    <svg
                      className={`w-4 h-4 ml-2 -mr-1 transition-transform ${menuAberto ? 'rotate-0' : 'rotate-180'
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 8.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {menuAberto && (
                    <div className="absolute right-0 mt-2 space-y-2 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div
                        onClick={handleLogout}
                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        Logout
                      </div>
                      {/* Adicione mais opções aqui, se necessário */}
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <li><Link className='title' href={'/login/cliente'}>Login</Link></li>
            )}

          </ul>
        </div>
        <div className="toggle icon-menu"></div>
        <div className="toggle icon-close"></div>
      </nav>
    </header>
  );
};

export default Navbar;
