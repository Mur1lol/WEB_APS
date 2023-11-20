import React, { useContext, useState } from 'react';

import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import Navbar from '@/components/navbar';
import { getAPIClient } from '@/services/axios';

type Agenda = {
  id: number;
  data: string;
  hora: number;
  cliente: {
    id: number;
    nome: string;
  };
  funcionario_funcao: {
    id: number;
    funcionario: {
      id: number;
      nome: string;
    };
    funcao: {
      id: number;
      nome_funcao: string;
    };
  };
}

type Agendamentos = {
  dadosDaAPI: Agenda
}

const History = (dadosDaAPI) => {
  // Simulação de dados de agendamentos (pode ser substituída por dados reais da sua aplicação)
  const appointments = [
    { date: '2023-11-20', hour: 14, status: 'passado' },
    { date: '2023-11-25', hour: 10, status: 'futuro' },
    { date: '2023-12-01', hour: 16, status: 'futuro' },
    // Adicione mais agendamentos conforme necessário
  ];

  const getCurrentDate = () => new Date().toISOString().split('T')[0]; // Obtém a data atual no formato "YYYY-MM-DD"

  const teste = dadosDaAPI.dadosDaAPI;
  const agendamentoPassado = teste.filter((agenda: Agenda) => agenda.data < getCurrentDate());
  const agendamentoFuturo = teste.filter((agenda: Agenda) => agenda.data > getCurrentDate());

  return (

    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Histórico de Agendamentos</h2>

      {/* Card de Agendamentos Futuros */}
      {agendamentoFuturo.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Agendamentos Futuros:</h3>
          {agendamentoFuturo.map((teste, index) => (
            <div key={index} className="bg-gray-200 p-4 mb-4 rounded">
              <p>{`Data: ${teste.data.split('T')[0]}, Horário: ${teste.hora}:00`}</p>
              <p>{`Serviço: ${teste.funcionario_funcao.funcao.nome_funcao}`}</p>
              <p>Status: Pendente</p>
            </div>
          ))}
        </div>
      )}

      {/* Card de Agendamentos Passados */}
      {agendamentoPassado.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Agendamentos Passados:</h3>
          {agendamentoPassado.map((teste, index) => (
            <div key={index} className="bg-gray-200 p-4 mb-4 rounded">
              <p>{`Data: ${teste.data.split('T')[0]}, Horário: ${teste.hora}:00`}</p>
              <p>{`Serviço: ${teste.funcionario_funcao.funcao.nome_funcao}`}</p>
              <p>Status: Concluido</p>
            </div>
          ))}
        </div>
      )}

      {/* Mensagem se não houver agendamentos futuros ou passados */}
      {agendamentoFuturo.length === 0 && agendamentoPassado.length === 0 && (
        <p>Nenhum agendamento encontrado.</p>
      )}

    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx)

  console.log('TOKEN: ' + token)

  if (!token) {
    return {
      redirect: {
        destination: '/login/cliente',
        permanent: false,
      }
    }
  }

  try {
    const response = await apiClient.get('/agendamento');
    const dadosDaAPI = response.data;

    return {
      props: {
        dadosDaAPI,
      },
    };
  } catch (error) {
    console.error('Erro na requisição:', error);

    return {
      props: {
        dadosDaAPI: null,
      },
    };
  }
};

export default History;