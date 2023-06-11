import { useLoaderData } from "react-router-dom";
import ListaResultados from "../components/listaResultados";

export const Resultados = () => {
    const resultados = useLoaderData();

    return (
        <ListaResultados resultados={resultados} />
    );
};

export const getResultados = async () => {
    const resp = await fetch('/resultado/RecuperarTodos');
    const data = await resp.json();

    return data.resultados;
};