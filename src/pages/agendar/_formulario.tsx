import React, { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../../services/axios'

import { useAuth } from '@/contexts/AuthContext';
import Head from 'next/head';
import { showErrorAlert, showSuccessAlert } from '@/components/swal';
import Router from 'next/router';

const dataAtual = new Date();
dataAtual.setHours(dataAtual.getHours() -3); // FUSO HORARIO

const currentDate = dataAtual.toISOString().split('T')[0];

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

const Formulario: React.FC<AppointmentProps> = ({
  data_funcoes,
  data_funcionarios,
  data_agendamentos
}) => {

  const [funcao, setFuncao]           = useState<number | null>(null);
  const [funciFuncao, setFunciFuncao] = useState<number | null>(null);
  const [data, setData]               = useState<string | null>(null);
  const [hora, setHora]               = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleFunctionSelection = async (selected: number) => {
    setFuncao(selected);
    setFunciFuncao(null);
    setData(null);
    setHora(null);
    setIsConfirmed(false);
  };

  const handleEmployeeSelection = (selected: number) => {
    setFunciFuncao(selected);
    setData(null);
    setHora(null);
    setIsConfirmed(false);
  };

  const handleDateSelection = (date: string) => {
    setData(date);
    setHora(null);
    setIsConfirmed(false);
  };

  const handleHourSelection = (hour: string) => {
    setHora(hour);
  };

  const handleConfirmation = async () => {
    try {
      const api = getAPIClient();

      const response = await api.post('/agendamento', {
        data,
        hora,
        funciFuncao,
      });

      showSuccessAlert(response.data.sucess);
      Router.push('/historico');
    } catch (error) {
      console.log(error)
      showErrorAlert('Erro ao agendar!');
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Agendamento</h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Card de Funções */}
        <div className="p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Escolha uma Função:</h3>
          <select
            onChange={(e) => handleFunctionSelection(parseInt(e.target.value))}
            value={funcao || ''}
            className="border rounded p-2 w-full"
          >
            <option value="" disabled>Selecione uma opção</option>
            {data_funcoes?.map((func) => (
              <option key={func.id} value={func.id}>{func.nome_funcao}</option>
            ))}
          </select>
        </div>

        {/* Card de Funcionários */}
        <div className="p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Escolha um Funcionário:</h3>
          <select
            onChange={(e) => handleEmployeeSelection(parseInt(e.target.value))}
            value={funciFuncao || ''}
            className="border rounded p-2 w-full"
            disabled={!funcao}
          >
            <option value="" disabled>Selecione uma opção</option>
            {data_funcionarios?.filter((funcionario) => funcionario.funcao.id == funcao)?.map((employee: Funcionario_Funcao) => (
              <option key={employee.id} value={employee.id}>{employee.funcionario.nome}</option>
            ))}
          </select>
        </div>

        {/* Card de Datas */}
        <div className="p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Escolha uma Data:</h3>
          <input
            type="date"
            min={currentDate}
            onChange={(e) => handleDateSelection(e.target.value)}
            className="border rounded p-2 w-full"
            disabled={!funciFuncao}
          />
        </div>
      </div>

      {/* Card de Horários */}
      {data && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Escolha um Horário:</h3>
          <div className="grid grid-cols-3 gap-4">
            {['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'].map((hour) => (
              <button
                key={hour}
                onClick={() => handleHourSelection(hour)}
                className={`p-2 border rounded ${hora === hour ? 'bg-green-500 text-white' : 'hover:bg-gray-200'
                  }`}
                disabled={isConfirmed}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Botão de Confirmação */}
      {hora && (
        <div className="mt-4">
          <button
            onClick={handleConfirmation}
            className="bg-green-500 text-white p-2 rounded"
          >
            Confirmar Agendamento
          </button>
        </div>
      )}
    </div>
  );
};

export default Formulario;