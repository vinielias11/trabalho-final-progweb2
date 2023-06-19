import { useEffect, useState } from 'react';
import './styles.css';
import AuthConsumer from '../../hooks/auth';

const RealizaTestes = ({realizaTeste}) => {   
    const [indicePerguntaAtual, setIndice] = useState(0);
    const [exibirBotaoFinalizar, setBotaoFinalizar] = useState(false);
    const [perguntaAtual, setPergunta] = useState(realizaTeste.perguntas[indicePerguntaAtual]);
    const [altMarcada, setAltMarcada] = useState('')
    const [autenticado] = AuthConsumer()

    useEffect(() => {

        setPergunta(realizaTeste.perguntas[indicePerguntaAtual]);

        if (indicePerguntaAtual + 1 === realizaTeste.perguntas.length) {
            setBotaoFinalizar(true);
          } else {
            setBotaoFinalizar(false);
          }

      }, [realizaTeste.perguntas, indicePerguntaAtual]);

    
    
    const  onclickAvancar = () =>{

        if(indicePerguntaAtual < realizaTeste.perguntas.length - 1){
            setIndice(indicePerguntaAtual + 1);
        }

    }

    const onclickVoltar = () =>{
        if(indicePerguntaAtual > 0){
            setIndice(indicePerguntaAtual - 1);
        }
           
    }
    
    const handleClick = (alt) => {
        setAltMarcada(alt)
        perguntaAtual.alternativaMarcada = alt;
    }


    const onClickFinalizarTeste = () => {
        criarResultado();
    }

    const criarResultado = async () => {
        const resp = await fetch(`/resultado/Criar`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(getResultado())
        });

        return await resp.json();
    }

    const getResultado = () => {

        let perguntasCorretas = 0;

        for(let i = 0; i < realizaTeste.perguntas.length; i++){
            const altMarcadaFinal = realizaTeste.perguntas[i].alternativaMarcada;
            const altCorretaFinal = realizaTeste.perguntas[i].alternativaCorreta;

            if(altMarcadaFinal === altCorretaFinal){
                perguntasCorretas++;
            }
        }

        let porcentagemDeAcertos = ((perguntasCorretas / realizaTeste.perguntas.length) * 100).toFixed(2);

        return {
            idTeste: realizaTeste._id,
            nomeTeste: realizaTeste.nome,
            nomeUsuario: autenticado.nome,
            perguntasTotais: realizaTeste.perguntas.length,
            respostasCorretas: perguntasCorretas,
            porcentagemAcertos: porcentagemDeAcertos,
        }
    }


    return (
            <>
            <div className="realiza_wrapperCabecalho">
                <h4 id="realiza_tituloTeste" className="tituloTeste">{realizaTeste.nome}</h4>
            </div>
            <div className="realiza_wrapperPergunta">
                <div className="realiza_botoesPerguntasVoltar">
                    <i id="botaoVoltarPergunta" className="fa-solid fa-chevron-left fa-3x" onClick={() => onclickVoltar()}></i>
                </div>
                <div className="realiza_container" id="containerFormTeste">
                    <form id="formTestes">
                        <div className="realiza_row">
                            <h4 id="realiza_tituloPergunta">{perguntaAtual.titulo}</h4>
                        </div>
                        <div className="realiza_row">
                            <h4>Resposta</h4>
                        </div>
                        <div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaA" type="radio" name="alternativas" value="A" checked={perguntaAtual.alternativaMarcada === 'A'} onChange={(event) => handleClick(event.target.value)} /> <label htmlFor="alternativaA" className="realiza_letraAlternativa">A</label>
                            <input type="radio" name="tituloAlternativaA" disabled={true} /><label htmlFor="tituloAlternativaA" className="realiza_tituloAlternativas" id="tituloAlternativaA">{perguntaAtual.alternativaA}</label>
                        </div><div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaB" type="radio" name="alternativas" value="B" checked={perguntaAtual.alternativaMarcada === 'B'} onChange={(event) => handleClick(event.target.value)} /> <label htmlFor="alternativaB" className="realiza_letraAlternativa">B</label>
                            <input type="radio" name="tituloAlternativaB" disabled={true} /><label htmlFor="tituloAlternativaB" className="realiza_tituloAlternativas" id="tituloAlternativaB">{perguntaAtual.alternativaB}</label>
                        </div><div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaC" type="radio" name="alternativas" value="C" checked={perguntaAtual.alternativaMarcada === 'C'} onChange={(event) => handleClick(event.target.value)} /> <label htmlFor="alternativaC" className="realiza_letraAlternativa">C</label>
                            <input type="radio" name="tituloAlternativaC" disabled={true} /><label htmlFor="tituloAlternativaC" className="realiza_tituloAlternativas" id="tituloAlternativaC">{perguntaAtual.alternativaC}</label>
                        </div><div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaD" type="radio" name="alternativas" value="D" checked={perguntaAtual.alternativaMarcada === 'D'} onChange={(event) => handleClick(event.target.value)} /> <label htmlFor="alternativaD" className="realiza_letraAlternativa">D</label>
                            <input type="radio" name="tituloAlternativaD" disabled={true} /><label htmlFor="tituloAlternativaD" className="realiza_tituloAlternativas" id="tituloAlternativaD">{perguntaAtual.alternativaD}</label>
                        </div><div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaE" type="radio" name="alternativas" value="E" checked={perguntaAtual.alternativaMarcada === 'E'} onChange={(event) => handleClick(event.target.value)} /> <label htmlFor="alternativaE" className="realiza_letraAlternativa">E</label>
                            <input type="radio" name="tituloAlternativaE" disabled={true} /><label htmlFor="tituloAlternativaE" className="realiza_tituloAlternativas" id="tituloAlternativaE">{perguntaAtual.alternativaE}</label>
                        </div>
                    </form>
                </div>
                <div className="realiza_botoesPerguntasAvancar">
                    <i id="realiza_botaoAvancarPergunta" className="fa-solid fa-chevron-right fa-3x" onClick={() => onclickAvancar()}></i>
                </div>
            </div>
            <div className="realiza_wrapperRodape">
                <h4 id="numeroPerguntas">Pergunta {indicePerguntaAtual + 1} / {realizaTeste.perguntas.length}</h4>
                {exibirBotaoFinalizar && (
                    <button id="btnFinalizar" className="realiza_btn" onClick={() => onClickFinalizarTeste()}><i className="fa fa-check"></i>Finalizar</button>
                )}
                <h4 id="realiza_porcentagemAcertos" className="realiza_porcentagemAcertos"></h4>
            </div></>
        );
};

export default RealizaTestes