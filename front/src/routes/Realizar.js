import { useParams } from "react-router-dom";
import RealizaTeste from "../components/realizaTeste";
import { useEffect, useState } from "react";

export const Realizar = () => {
    const params = useParams();
    const [realizaTeste, setRealizaTeste] = useState({nome: '', materia: '', dificuldade: '', perguntas: [{titulo: '', alternativaA: '', alternativaB: '', alternativaC: '', alternativaD: '', alternativaE: '', alternativaCorreta: ''}]});

    useEffect(() =>{
        async function fetchData(){
            const resp = await fetch(`/teste/RecuperarPorId/${params.id}`, {headers: {"Content-Type": "application/json"},})

            const objResponse = await resp.json();

            if (objResponse.status !== 'OK') {
                alert(objResponse.erro);
                return;
            }

            setRealizaTeste(objResponse.teste);

        }
        
        fetchData();
        

    }, [])


    
    return (
        <RealizaTeste realizaTeste={realizaTeste} />
    );
};

export default Realizar;