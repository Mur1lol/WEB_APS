import { parseCookies } from 'nookies'
import { AuthContext } from '../../contexts/AuthContext'
import { GetServerSideProps } from 'next'
import { getAPIClient } from '../../services/axios'

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import { api } from '@/services/api';
import { stringify } from 'querystring';

const functionsList = ['Corte', 'Coloração', 'Escova'];
const employeesList = ['Barbeiro 1', 'Cabeleireiro 1', 'Estilista 1'];
const currentDate = new Date().toISOString().split('T')[0];

import { useAuth } from '@/contexts/AuthContext';

const Appointment = ({ data_funcoes, data_funcionarios, data_agendamentos }) => {

  const [selectedFunction, setSelectedFunction] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [funcionarios, setFuncionarios] = useState(null);
  const [funcionariosId, setFuncionariosId] = useState(null);
  const [funciFuncao, setFunciFuncao] = useState(null);
  const [agendamentos, setAgendamentos] = useState(null);


  const handleFunctionSelection = async (selected) => {
    setSelectedFunction(selected);
    setSelectedEmployee(null);
    setSelectedDate(null);
    setSelectedHour(null);
    setIsConfirmed(false);

    const funci = data_funcionarios.filter((funcionario) => funcionario.funcao.id == selected);
    setFuncionarios(funci);
  };

  const handleEmployeeSelection = (selected) => {
    setSelectedEmployee(selected);
    setSelectedDate(null);
    setSelectedHour(null);
    setIsConfirmed(false);

    setFunciFuncao(selected.split('_')[0]);
    setFuncionariosId(selected.split('_')[1]);
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setSelectedHour(null);
    setIsConfirmed(false);


    const agendados = data_agendamentos.filter(
      (agenda) =>
        agenda.data.split('T')[0] == date && agenda.funcionario_funcao.funcionario.id == funcionariosId
    );
    console.log(agendados);
    console.log(funcionarios)

    setAgendamentos(agendados);
  };

  const handleHourSelection = (hour) => {
    setSelectedHour(hour);
  };

  const handleConfirmation = () => {
    setIsConfirmed(true);
  };

  const handleCancelConfirmation = () => {
    setIsConfirmed(false);
  };

  const { usuarioLogado, logout } = useAuth();

  console.log(usuarioLogado)

  return (

    <div className="container mx-auto mt-8">
      {usuarioLogado == 1 ? (<div>ENTROU</div>) : (<div>SAIU</div>)}
      <p>{JSON.stringify(data_agendamentos, null, 4)}</p>
      <h2 className="text-2xl font-bold mb-4">Agendamento</h2>

      {/* Cards Horizontais */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Card de Funções */}
        <div className="p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Escolha uma Função:</h3>
          <select
            onChange={(e) => handleFunctionSelection(e.target.value)}
            value={selectedFunction || ''}
            className="border rounded p-2 w-full"
          >
            <option value="" disabled>Selecione uma opção</option>
            {data_funcoes.map((func) => (
              <option key={func.id} value={func.id}>{func.nome_funcao}</option>
            ))}
          </select>
        </div>

        {/* Card de Funcionários */}
        <div className="p-4 border rounded">
          <h3 className="text-lg font-semibold mb-2">Escolha um Funcionário:</h3>
          <select
            onChange={(e) => handleEmployeeSelection(e.target.value)}
            value={selectedEmployee || ''}
            className="border rounded p-2 w-full"
            disabled={!selectedFunction}
          >
            <option value="" disabled>Selecione uma opção</option>
            {funcionarios?.map((employee) => (
              <option key={employee.id + '_' + employee.funcionario.id} value={employee.id + '_' + employee.funcionario.id}>{employee.funcionario.nome}</option>
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
            disabled={!selectedEmployee}
          />
        </div>
      </div>

      {/* Card de Horários */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Escolha um Horário:</h3>
          <div className="grid grid-cols-3 gap-4">
            {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => (
              <button
                key={hour}
                onClick={() => handleHourSelection(hour)}
                className={`p-2 border rounded ${selectedHour === hour ? 'bg-green-500 text-white' : 'hover:bg-gray-200'
                  }`}
                disabled={isConfirmed}
              >
                {`${hour}:00 - ${hour + 1}:00`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Botão de Confirmação */}
      {selectedHour && (
        <div className="mt-4">
          {!isConfirmed ? (
            <button
              onClick={handleConfirmation}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Confirmar Agendamento
            </button>
          ) : (
            <div className="flex">
              <button
                onClick={handleCancelConfirmation}
                className="bg-gray-500 text-white p-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={() => alert(`Agendado para ${selectedDate} às ${selectedHour}:00`)}
                className="bg-green-500 text-white p-2 rounded"
              >
                Confirmar
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  try {
    const responseFuncao = await apiClient.get('/funcao');
    const data_funcoes = responseFuncao.data;

    const responseFuncionario = await apiClient.get('/funci_funcao');
    const data_funcionarios = responseFuncionario.data;

    const responseAgendamento = await apiClient.get('/agendamento');
    const data_agendamentos = responseAgendamento.data;

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

