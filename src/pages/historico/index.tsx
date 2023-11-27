import React, { useContext, useState } from 'react';

import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '@/services/axios';

type Agenda = {
  id: number;
  data: string;
  hora: string;
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
  dadosDaAPI: Agenda[]
}

const History: React.FC<Agendamentos> = ({ dadosDaAPI }) => {
  // Simulação de dados de agendamentos (pode ser substituída por dados reais da sua aplicação)

  for (let i = 1; i < 2; i++) {
    const dataNormal = new Date('2023-11-10')
    const dataISO = dataNormal.toISOString().split('T')[0];
    const dataBR = dataNormal.toLocaleDateString('en');
    const dataBRISO = new Date(dataBR).toLocaleDateString('pt-br');

    console.log('DATA 1: ' + dataISO, 'DATA 2: ' + dataBR, 'DATA 3: ' + dataBRISO)
  }

  const date = new Date();
  const getCurrentDate = () => date.toISOString().split('T')[0] // Obtém a data atual no formato "YYYY-MM-DD"

  console.log(dadosDaAPI[0].hora, date.getHours()+':'+date.getMinutes())
  const agendamentoPassado = dadosDaAPI?.filter((agenda) => 
    agenda.data < getCurrentDate() || ( agenda.data == getCurrentDate() && agenda.hora < date.getHours()+':'+date.getMinutes())
  );
  const agendamentoFuturo = dadosDaAPI?.filter((agenda) => 
    agenda.data > getCurrentDate() || (agenda.data == getCurrentDate() && agenda.hora >= date.getHours()+':'+date.getMinutes())
  );

  return (

    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Histórico de Agendamentos</h2>

      {/* Card de Agendamentos Futuros */}
      {agendamentoFuturo.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Agendamentos Futuros:</h3>
          {agendamentoFuturo.map((agenda, index) => (
            <div key={index} className="bg-gray-200 p-4 mb-4 rounded">
              <p>{`Data: ${agenda.data.split('-')[2]}/${agenda.data.split('-')[1]}/${agenda.data.split('-')[0]}`}</p>
              <p>{`Horário: ${agenda.hora}`}</p>
              <p>{`Funcionario: ${agenda.funcionario_funcao.funcionario.nome}`}</p>
              <p>{`Serviço: ${agenda.funcionario_funcao.funcao.nome_funcao}`}</p>
              <p>Status: Pendente</p>
            </div>
          ))}
        </div>
      )}

      {/* Card de Agendamentos Passados */}
      {agendamentoPassado.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Agendamentos Passados:</h3>
          {agendamentoPassado.map((agenda, index) => (
            <div key={index} className="bg-gray-200 p-4 mb-4 rounded">
              <p>{`Data: ${new Date(agenda.data).toLocaleDateString("pt-br")}`}</p>
              <p>{`Horário: ${agenda.hora}`}</p>
              <p>{`Serviço: ${agenda.funcionario_funcao.funcao.nome_funcao}`}</p>
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

  if (!token) {
    return {
      redirect: {
        destination: '/login/cliente',
        permanent: false,
      }
    }
  }

  try {
    const response = await apiClient.get('/agendamento/cliente');
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