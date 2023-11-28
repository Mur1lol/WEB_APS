import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getAPIClient } from '@/services/axios';
import { parseCookies } from 'nookies';

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

const Relatorios: React.FC<Agendamentos> = ({ dadosDaAPI }) => {

  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [resultados, setResultados] = useState<Agenda[]>([]);

  const [cabeleireiro, setCabeleireiro] = useState<Agenda[]>([]);
  const [manicure, setManicure] = useState<Agenda[]>([]);
  const [pedicure, setPedicure] = useState<Agenda[]>([]);


  const handleFiltrar = () => {
    const qtdeAgendamentos = dadosDaAPI?.filter((agenda) =>
      agenda.data >= dataInicio && agenda.data <= dataFim
    );

    const qtdeCabeleireiro = qtdeAgendamentos?.filter((funcao) =>
      funcao.funcionario_funcao.funcao.id == 1
    );

    const qtdeManicure = qtdeAgendamentos?.filter((funcao) =>
      funcao.funcionario_funcao.funcao.id == 2
    );

    const qtdePedicure = qtdeAgendamentos?.filter((funcao) =>
      funcao.funcionario_funcao.funcao.id == 3
    );

    // Atualize os resultados
    setCabeleireiro(qtdeCabeleireiro);
    setManicure(qtdeManicure);
    setPedicure(qtdePedicure);
    setResultados(qtdeAgendamentos);
  };

  const isDataInicioSelecionada = dataInicio !== '';

  return (
    <>
      <div className="max-w-3xl mx-auto mt-8 p-4 border rounded">
        <h2 className="text-2xl font-bold mb-4">Tela de Relatórios</h2>

        <div className="flex space-x-4 mb-4">
          <div>
            <label>Data de Início:</label>
            <input
              type="date"
              value={dataInicio}
              onChange={(e) => { setDataInicio(e.target.value); setDataFim(e.target.value) }}
              className="border rounded p-2"
            />
          </div>

          <div>
            <label>Data de Fim:</label>
            <input
              type="date"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              className={`border rounded p-2 ${!isDataInicioSelecionada ? 'cursor-not-allowed bg-gray-200' : ''}`}
              disabled={!isDataInicioSelecionada}
              min={dataInicio}
            />
          </div>

          <button type="button" onClick={handleFiltrar} className="bg-blue-500 text-white px-4 py-2 rounded">
            Filtrar
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-8 p-4 border rounded">
        {resultados && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Número total de resultados: {resultados.length}</h3>
            {resultados.length > 0 && (
              <>
                <div className="flex space-x-4 m-4">
                  <div className="w-1/3 bg-gray-100 p-4 border rounded">
                    <p className="font-semibold">Cabeleireiro</p>
                    <p>Quantidade de Agendamentos: {cabeleireiro.length}</p>
                  </div>
                  <div className="w-1/3 bg-gray-100 p-4 border rounded">
                    <p className="font-semibold">Manicure</p>
                    <p>Quantidade de Agendamentos: {manicure.length}</p>
                  </div>
                  <div className="w-1/3 bg-gray-100 p-4 border rounded">
                    <p className="font-semibold">Pedicure</p>
                    <p>Quantidade de Agendamentos: {pedicure.length}</p>
                  </div>
                </div>
                <table className="w-full border-collapse border">
                  <thead>
                    <tr>
                      <th className="border p-2">Data</th>
                      <th className="border p-2">Hora</th>
                      <th className="border p-2">Cliente</th>
                      <th className="border p-2">Serviço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultados.map((resultado: Agenda, index) => (
                      <tr key={index}>
                        <td className="border p-2">{resultado.data}</td>
                        <td className="border p-2">{resultado.hora}</td>
                        <td className="border p-2">{resultado.cliente.nome}</td>
                        <td className="border p-2">{resultado.funcionario_funcao.funcao.nome_funcao}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>
    </>
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
    const response = await apiClient.get('/agendamento/funcionario');
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
