import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import { api } from "../services/api";
import { showErrorAlert } from '@/components/swal';

type User = {
  id: number;
  nome: string;
  email: string;
}

type SignInData = {
  email: string;
  senha: string;
}

type AuthContextProps = {
  usuarioLogado: number;
  signInFuncionario: ({ email, senha }: SignInData) => Promise<void>;
  signInCliente: ({ email, senha }: SignInData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [usuarioLogado, setUsuarioLogado] = useState(0);


  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    const usuarioLogadoLocalStorage = localStorage.getItem('usuarioLogado');
    if (token && usuarioLogadoLocalStorage) {
      setUsuarioLogado(parseInt(usuarioLogadoLocalStorage));
    }
  }, []);

  async function signInCliente({ email, senha }: SignInData) {
    await api.post('cliente/login', {
      email,
      senha
    }).then((response) => {
      destroyCookie(undefined, 'nextauth.token');
      setCookie(undefined, 'nextauth.token', response.data.dados.token, {
        maxAge: 60 * 60 * 1, // 1 hour
      });

      //setUser(response.data.dados.cliente);
      setUsuarioLogado(1);
      localStorage.setItem('usuarioLogado', '1');

      api.defaults.headers['Authorization'] = `Bearer ${response.data.dados.token}`;  
    
      Router.push('/');
    }).catch((error) => {
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

      //setUser(response.data.dados.cliente);
      if(response.data.dados.funcionario.admin) {
        setUsuarioLogado(3);
        localStorage.setItem('usuarioLogado', '3');
      }
      else {
        setUsuarioLogado(2);
        localStorage.setItem('usuarioLogado', '2');
      }
      
  
      api.defaults.headers['Authorization'] = `Bearer ${response.data.dados.token}`;  
    
      Router.push('/');
    }).catch((error) => {
      showErrorAlert(error.response.data.error);
    })
  };

  function logout() {
    setUsuarioLogado(0);
    localStorage.removeItem('usuarioLogado');
    destroyCookie(undefined, 'nextauth.token');
    Router.push('/');
  };

  return (
    <AuthContext.Provider value={{ usuarioLogado, signInFuncionario, signInCliente, logout }}>
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