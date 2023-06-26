import { useLoaderData, useNavigate } from "react-router-dom";
import ListaResultados from "../components/listaResultados";
import AuthConsumer from "../hooks/auth";

const Resultados = () => {
    const resultados = useLoaderData();
    const [autenticado] = AuthConsumer();
    const navigate = useNavigate();

    const deletarResultado = async (idResultado) => {
        if (!autenticado.admin) {
            alert('Você não tem autorização para deletar um teste!')
            return;
        }
        
        const resp = await fetch(`/resultado/Deletar/${idResultado}`, {
            method: 'DELETE'
        });
    
        const objResponse = await resp.json();
        
        if (objResponse.status !== "OK") {
            alert(objResponse.erro);
        } else {
            navigate('/menu/resultados');
        }
    };
    return (
        <ListaResultados resultados={resultados} deletarResultado={deletarResultado}/>
    );
};

export const getResultados = async () => {
    const resp = await fetch('/resultado/RecuperarTodos');
    const data = await resp.json();

    return data.resultados;
};

export default Resultados;