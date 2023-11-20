import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import { api } from "../services/api";
import { showErrorAlert } from '@/components/swal';

import { jwtDecode } from 'jwt-decode';

type User = {
  id: number;
  nome: string;
  email: string;
  tipo: string;
}

type SignInData = {
  email: string;
  senha: string;
}

type AuthContextProps = {
  user: User | null;
  signInFuncionario: ({ email, senha }: SignInData) => Promise<void>;
  signInCliente: ({ email, senha }: SignInData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const segredo = process.env.NEXT_PUBLIC_JWT_SECRET;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    if (token) {
      try {
        const user:User = jwtDecode(token);
        setUser(user);
      }
      catch(error) {
        setUser(null);
      }
    }
  }, []);

  async function signInCliente({ email, senha }: SignInData) {
    await api.post('cliente/login', {
      email,
      senha
    }).then((response) => {
      const token = response.data.dados.token;

      destroyCookie(undefined, 'nextauth.token');
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      setUser(response.data.dados.cliente);

      api.defaults.headers['Authorization'] = `Bearer ${token}`;  
    
      Router.push('/');
    }).catch((error) => {
      console.log(error)
      showErrorAlert(error.response.data.error);
    });
  };

  async function signInFuncionario({ email, senha }: SignInData) {
    await api.post('funcionario/login', {
      email,
      senha
    }).then((response) => {
      destroyCookie(undefined, 'nextauth.token');
      setCookie(undefined, 'nextauth.token', response.data.dados.token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      setUser(response.data.dados.funcionario);

      api.defaults.headers['Authorization'] = `Bearer ${response.data.dados.token}`;  
    
      Router.push('/');
    }).catch((error) => {
      showErrorAlert(error.response.data.error);
    })
  };

  function logout() {
    setUser(null);
    destroyCookie(undefined, 'nextauth.token');
    Router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, signInFuncionario, signInCliente, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};