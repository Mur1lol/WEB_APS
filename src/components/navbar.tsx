// components/Navbar.tsx

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

import logo from '../assets/images/logo-empresa.svg';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownAberto(!dropdownAberto);
  };

  const handleLoginLogout = () => {
    logout();
    setDropdownAberto(false);
  };

  const renderUserOptions = () => {
    switch (user?.tipo) {
      case 'cliente':
        return (
          <>
            <button className="text-white"><Link href={'/agendar'}>Agendar Serviço</Link></button>
            <button className="text-white"><Link href={'/historico'}>Historico</Link></button>

          </>
        );
      case 'funcionario':
        return (
          <>
            <button className="text-white"><Link href={'/agendamentos'}>Agendamentos</Link></button>
            <button className="text-white"><Link href={'/meu_relatorio'}>Meu Relatorio</Link></button>

          </>
        );
      case 'admin':
        return (
          <>
            <button className="text-white"><Link href={'/cadastrar/funcionario'}>Cadastrar Funcionario</Link></button>
            <button className="text-white"><Link href={'/relatorio'}>Relatorio</Link></button>

          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-lg">
          {/* Logo */}
          <button>
          
            <Link href={'/'}>
            <img
            src={logo} // Substitua pelo caminho da sua imagem de logo
            alt="Logo"
            className="mr-4"
          />
            </Link>
          </button>     
        </div>
        <div className="flex space-x-4">
          {/* Opções do usuário */}
          {renderUserOptions()}

          {/* Botão de Login/Logout */}
          {user?.tipo ? (
            <div className="relative inline-block text-left">
            <button
              type="button"
              onClick={handleDropdownToggle}
              className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300"
            >
              {user?.nome} {/* Adicione aqui a propriedade do usuário que você deseja exibir */}
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L6 9.414V15a1 1 0 11-2 0V9.414L1.293 12.707a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
  
            {dropdownAberto && (
              <div className="absolute right-0 mt-2 space-y-2 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {/* Opções do dropdown */}
                <button
                  type="button"
                  onClick={handleLoginLogout}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Logout
                </button>
                {/* Adicione mais opções aqui, se necessário */}
              </div>
            )}
          </div>
            
          ) : (
            <button className="text-white">
              <Link href={'/login/cliente'} >Login</Link>
            </button>
          )}
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
