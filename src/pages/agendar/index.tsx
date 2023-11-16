import api from "@/services/api";
import { FormEvent, useState } from "react"

export default function Teste() {

    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [idCliente, setIdCliente] = useState('');
    const [idFuncionarioFuncao, setIdFuncionarioFuncao] = useState('');

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('agendamento', {
            data,
            hora,
            idCliente,
            idFuncionarioFuncao
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
        }).catch(() => {
            alert('Erro no cadastro!');
        })
    }

    return ( 
        <main>
            <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus Dados</legend>

                    <div className="">
                        <label htmlFor="data">Data</label>
                        <input type="date" id="data" value={data} onChange={(e) => { setData(e.target.value)}}/>
                    </div>

                    <div className="">
                        <label htmlFor="hora">Hora</label>
                        <input type="time" id="hora" value={hora} onChange={(e) => { setHora(e.target.value)}}/>
                    </div>

                    <button type="submit">
                        Salvar cadastro
                    </button>
                </fieldset>
            </form>
        </main>
    )
}