import api from "@/services/api";
import { FormEvent, useState } from "react"

export default function Teste() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.get('agendamento').then(() => {
            console.log('Cadastro realizado com sucesso!');
        }).catch(() => {
            console.log('Erro no cadastro!');
        })
    }

    return ( 
        <main>
            <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus Dados</legend>

                    <div className="">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" value={nome} onChange={(e) => { setNome(e.target.value)}}/>
                    </div>

                    <div className="">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" value={email} onChange={(e) => { setEmail(e.target.value)}}/>
                    </div>

                    <div className="">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" value={senha} onChange={(e) => { setSenha(e.target.value)}}/>
                    </div>

                    <button type="submit">
                        Salvar cadastro
                    </button>
                </fieldset>
            </form>
        </main>
    )
}