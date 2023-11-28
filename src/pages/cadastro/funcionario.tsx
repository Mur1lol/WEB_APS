import { useState } from 'react';
import { getAPIClient } from '@/services/axios';

import { showErrorAlert, showSuccessAlert } from '@/components/swal';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

type Funcao = {
  id: number;
  nome_funcao: string;
}

type FuncaoProps = {
  data_funcoes: Funcao[]
}

const CadastroCliente: React.FC<FuncaoProps> = ({ data_funcoes }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [funcoesSelecionadas, setFuncoesSelecionadas] = useState<number[]>([]);
  const [todasFuncoes] = useState(['Função 1', 'Função 2', 'Função 3', 'Função 4']);


  const handleCadastro = async () => {
    try {
      const api = getAPIClient();

      const response = await api.post('/funcionario', {
        nome,
        email,
        senha,
      });

      for(let i=0; i<funcoesSelecionadas.length; i++) {
        await api.post('funci_funcao', {
          id_funcionario: response.data.dados.id,
	        id_funcao: funcoesSelecionadas[i]
        });
      }

      showSuccessAlert(response.data.dados.sucess);
    } catch (error: any) {
      showErrorAlert(error.response.data.message);
    }
  };

  const handleFuncaoChange = (funcao: number) => {
    // Atualiza a lista de funções selecionadas
    if (funcoesSelecionadas?.includes(funcao)) {
      // Se a função já estiver selecionada, remove-a
      setFuncoesSelecionadas(funcoesSelecionadas.filter((f) => f !== funcao));
    } else {
      // Se não estiver selecionada, adiciona-a
      setFuncoesSelecionadas([...funcoesSelecionadas, funcao]);
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex h-screen bg-gray-200">
        <div className="m-auto w-96 bg-white rounded p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Cadastro Funcionario</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">E-mail:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>

          <div className="checkbox max-h-40 overflow-y-auto">
            <label>Funções:</label>
            {data_funcoes.map((funcao) => (
              <div key={funcao.id} className="flex items-center">
                <input
                  type="checkbox"
                  value={funcao.id}
                  checked={funcoesSelecionadas.includes(funcao.id)}
                  onChange={() => handleFuncaoChange(funcao.id)}
                  className="mr-2 h-4 w-4"
                />
                <label>{funcao.nome_funcao}</label>
              </div>
            ))}
          </div>

          <button onClick={handleCadastro} className="bg-green-500 text-white p-2 rounded w-full">
            Cadastrar
          </button>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);

  try {
    const responseFuncao = await apiClient.get('/funcao');
    const data_funcoes: Funcao = responseFuncao.data;

    return {
      props: {
        data_funcoes,
      },
    };
  } catch (error) {
    console.error('Erro na requisição:', error);

    return {
      props: {
        data_funcoes: null,
      },
    };
  }
}

export default CadastroCliente;