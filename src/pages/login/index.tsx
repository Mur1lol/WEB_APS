import api from "@/services/api";
import { FormEvent, useState } from "react"

export default function Teste() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('cliente/login', {
            email,
            senha
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
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" value={email} onChange={(e) => { setEmail(e.target.value)}}/>
                    </div>

                    <div className="">
                        <label htmlFor="senha">Senha</label>
                        <input type="password" id="senha" value={senha} onChange={(e) => { setSenha(e.target.value)}}/>
                    </div>

                    <button type="submit">
                        Entrar
                    </button>
                </fieldset>
            </form>
            <div>
            <a href="/cadastrar" className="text-sm font-semibold leading-6 text-gray-900">
                Cadastrar
            </a>
            </div>
        </main>
    )
}