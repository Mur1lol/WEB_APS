// components/Navbar.tsx

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { usuarioLogado, logout } = useAuth();

  console.log(usuarioLogado)

  const handleLoginLogout = () => {
    logout();
  };

  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-lg">
          <button>
            <Link href={'/'}>Logo</Link>
          </button>
        </div>
        <div className="flex space-x-4">
          {usuarioLogado ? (
            <>
              <button className="text-white"><Link href={'/agendar'}>Agendar Serviço</Link></button>
              <button className="text-white"><Link href={'/historico'}>Historico</Link></button>
              <button className="text-white" onClick={handleLoginLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="text-white">
              <Link href={'/login/cliente'} >Login</Link>
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
