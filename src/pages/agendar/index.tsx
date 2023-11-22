import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../../services/axios'

import React, { useEffect, useState } from 'react';
const currentDate = new Date().toISOString().split('T')[0];

import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head';
import Formulario from './_formulario';

type Funcao = {
  id: number;
  nome_funcao: string;
}

type Funcionario = {
  id: number;
  nome: string;
}

type Cliente = {
  id: number;
  nome: string;
}

type Funcionario_Funcao = {
  id: number,
  funcionario: Funcionario;
  funcao: Funcao;
}

type Agendamento = {
  id: number;
  data: Date;
  hora: string;
  cliente: Cliente;
  funcionario_funcao: Funcionario_Funcao;
}

type AppointmentProps = {
  data_funcoes: Funcao[];
  data_funcionarios: Funcionario_Funcao[];
  data_agendamentos: Agendamento[];
}

const Appointment: React.FC<AppointmentProps> = ({
  data_funcoes,
  data_funcionarios,
  data_agendamentos
}) => {

  const { user } = useAuth();

  const renderAgendar = () => {
    switch (user?.tipo) {
      case 'cliente':
        return (
          <Formulario
            data_funcoes={data_funcoes}
            data_funcionarios={data_funcionarios}
            data_agendamentos={data_agendamentos}
          />
        );
      default:
        return (
          <>
            <p>ACESSO NEGADO!</p>
          </>
        )
    }
  }

  return (

    <div className="container mx-auto mt-8">
      <Head>
        <title>Agendar</title>
      </Head>
      {renderAgendar()}
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login/cliente',
        permanent: false,
      }
    }
  }

  try {
    const responseFuncao = await apiClient.get('/funcao');
    const data_funcoes: Funcao = responseFuncao.data;

    const responseFuncionario = await apiClient.get('/funci_funcao');
    const data_funcionarios: Funcionario_Funcao = responseFuncionario.data;

    const responseAgendamento = await apiClient.get('/agendamento');
    const data_agendamentos: Agendamento = responseAgendamento.data;

    return {
      props: {
        data_funcoes,
        data_funcionarios,
        data_agendamentos
      },
    };
  } catch (error) {
    console.error('Erro na requisição:', error);

    return {
      props: {
        data_funcoes: null,
        data_funcionarios: null,
        data_agendamentos: null
      },
    };
  }
}

export default Appointment;

