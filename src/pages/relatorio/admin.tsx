// pages/relatorios.js
import React, { useState } from 'react';
import { getAPIClient } from '@/services/axios';
import { Bar } from 'react-chartjs-2';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';


import { format, isAfter } from 'date-fns';

const Relatorios = ({ dadosDaAPI }) => {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [resultados, setResultados] = useState([]);
  const [chartData, setChartData] = useState({});

  const handleFiltrar = () => {
    // Realize a lógica de filtro e obtenção de dados do servidor
    // Aqui é um exemplo fictício
    const dadosFiltrados = [
      { funcionario: 'Funcionario1', agendamentos: 10 },
      { funcionario: 'Funcionario2', agendamentos: 15 },
      // ... mais dados
    ];

    // Atualize os resultados e o gráfico
    setResultados(dadosFiltrados);
    updateChartData(dadosFiltrados);
  };

  const updateChartData = (dados) => {
    const labels = dados.map((d) => d.funcionario);
    const data = dados.map((d) => d.agendamentos);

    setChartData({
      labels,
      datasets: [
        {
          label: 'Quantidade de Agendamentos',
          data,
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    });
  };

  const isValidDateRange = () => {
    // Verifique se a data de fim é maior ou igual à data de início
    return isAfter(new Date(dataFim), new Date(dataInicio));
  };

  return (
    <div>
      <h2>Tela de Relatórios</h2>

      <div className="flex space-x-4">
        <div>
          <label>Data de Início:</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>

        <div>
          <label>Data de Fim:</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleFiltrar} disabled={!isValidDateRange()}>
          Filtrar
        </button>
      </div>

      <div>
        <h3>Número total de resultados: {resultados.length}</h3>
      </div>

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
