// pages/relatorios.js

import { useState } from 'react';
import { getAPIClient } from '@/services/axios';
import { Bar } from 'react-chartjs-2';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';

const Relatorios = ({ dadosDaAPI }) => {
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [dadosRelatorio, setDadosRelatorio] = useState(null);

  const handleGerarRelatorio = async () => {
    try {
      console.log(dadosDaAPI)
      setDadosRelatorio(dadosDaAPI);
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
    }
  };

  return (
    <div>
      <h1>Relatórios</h1>
      <div>
        <label>Mês:</label>
        <input type="text" value={mes} onChange={(e) => setMes(e.target.value)} />
      </div>
      <div>
        <label>Ano:</label>
        <input type="text" value={ano} onChange={(e) => setAno(e.target.value)} />
      </div>
      <button type="button" onClick={handleGerarRelatorio}>
        Gerar Relatório
      </button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login/funcionario',
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

export default Relatorios;
