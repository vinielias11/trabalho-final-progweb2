import { useLoaderData, useNavigate } from "react-router-dom";
import ListaTestes from "../components/listaTestes";
import { useState } from "react";
import CadastroTestes from "../components/cadastroTestes";
import AuthConsumer from "../hooks/auth";

const Testes = () => {
    const testes = useLoaderData();
    const navigate = useNavigate();
    const [autenticado] = AuthConsumer();

    const [cadastroAberto, setCadastroAberto] = useState(false);
    const [testeEditando, setTesteEditando] = useState({ _id: null, nome: '', materia: '', dificuldade: '', perguntas: [] });

    const fechaCadastro = () => {
        setTesteEditando({ _id: null, nome: '', materia: '', dificuldade: '', perguntas: [] });
        setCadastroAberto(false);
        
        document.body.style.overflow = 'unset';
    }

    const onClickNovoTeste = () => {
        if (!autenticado.admin) {
            alert('Você não tem autorização para criar um novo teste!')
            return;
        }

        setTesteEditando({ _id: null, nome: '', materia: '', dificuldade: '', perguntas: [] });
        setCadastroAberto(true);
        document.body.style.overflow = 'hidden';
    };

    const editarTeste = (teste) => {
        if (!autenticado.admin) {
            alert('Você não tem autorização para editar um teste!')
            return;
        }

        setTesteEditando(teste);
        setCadastroAberto(true);
        document.body.style.overflow = 'hidden';
    };

    const deletarTeste = async (idTeste) => {
        if (!autenticado.admin) {
            alert('Você não tem autorização para deletar um teste!')
            return;
        }

        const resp = await fetch(`/teste/Deletar/${idTeste}`, {
            method: 'DELETE'
        });

        const objResponse = await resp.json();

        if (objResponse.status !== "OK") {
            alert(objResponse.erro);
        } else {
            navigate(0);
        }
    };

    return (
        <>
            <CadastroTestes isAberto={cadastroAberto} fechaCadastro={() => fechaCadastro()} testeEditando={testeEditando} />
            <ListaTestes testes={testes} editarTeste={editarTeste} deletarTeste={deletarTeste} />
            <button onClick={() => onClickNovoTeste()} className="btn btn_fixado_direita"><i className="fa fa-plus"></i></button>
        </>
    );
};

export const getTestes = async () => {
    const resp = await fetch('/teste/RecuperarTodos');
    const data = await resp.json();

    return data.testes;
};

export default Testes;