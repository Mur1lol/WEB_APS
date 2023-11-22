import { useState } from 'react';
import { getAPIClient } from '@/services/axios';
import { useAuth } from '@/contexts/AuthContext';
import { showErrorAlert, showSuccessAlert } from '@/components/swal';

const CadastroCliente = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { signInCliente } = useAuth();

  const handleCadastro = async () => {
    try {
      const api = getAPIClient();

      const response = await api.post('/cliente', {
        nome,
        email,
        senha,
      });

      showSuccessAlert(response.data.sucess)
      await signInCliente({ email, senha });
    } catch (error: any) {
      showErrorAlert(error.response.data.message);
    }
  };

  return (

    <div className="flex h-screen bg-gray-200">
      <div className="m-auto w-96 bg-white rounded p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Cadastro Cliente</h2>

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

        <button onClick={handleCadastro} className="bg-green-500 text-white p-2 rounded w-full">
          Cadastrar
        </button>

        <div className="mt-4">
          <p className="text-gray-700 text-sm">
            Já possui uma conta?{' '}
            <a href="/login/cliente" className="text-blue-500">
              Faça login aqui
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CadastroCliente;