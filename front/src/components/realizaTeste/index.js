import { useEffect, useState } from 'react';
import './styles.css';

const RealizaTestes = ({realizaTeste}) => {   
    const [indicePerguntaAtual, setIndice] = useState(0)
    const [perguntaAtual, setPergunta] = useState(realizaTeste.perguntas[indicePerguntaAtual]);

    useEffect(() =>{
        setPergunta(realizaTeste.perguntas[indicePerguntaAtual])
    }, [realizaTeste.perguntas, indicePerguntaAtual])

    const onclickAvancar = () =>{
        if(indicePerguntaAtual < realizaTeste.perguntas.length - 1){
            setIndice(indicePerguntaAtual + 1);
        }

        
    }

    const onclickVoltar = () =>{
        if(indicePerguntaAtual > 0){
            setIndice(indicePerguntaAtual - 1);
        }

           
    }

    const onChangeAlternativa = (event) =>{
        const alternativaMarcada = event.target.value;
        
        console.log(alternativaMarcada)

        perguntaAtual.alternativaMarcada = alternativaMarcada;
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
                            <input id="alternativaA" type="radio" name="alternativas" value="A" onChange={(event) => onChangeAlternativa(event)} checked={perguntaAtual.alternativaMarcada == 'A'}/><label htmlFor="alternativaA" className="realiza_letraAlternativa">A</label>
                            <input type="radio" name="tituloAlternativaA" disabled={true} /><label htmlFor="tituloAlternativaA" className="realiza_tituloAlternativas" id="tituloAlternativaA">{perguntaAtual.alternativaA}</label>
                        </div>
                        <div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaB" type="radio" name="alternativas" value="B" onChange={(event) => onChangeAlternativa(event)} checked={perguntaAtual.alternativaMarcada == 'B'}/><label htmlFor="alternativaB" className="realiza_letraAlternativa">B</label>
                            <input type="radio" name="tituloAlternativaB" disabled={true} /><label htmlFor="tituloAlternativaB" className="realiza_tituloAlternativas" id="tituloAlternativaB">{perguntaAtual.alternativaB}</label>
                        </div>
                        <div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaC" type="radio" name="alternativas" value="C" onChange={(event) => onChangeAlternativa(event)} checked={perguntaAtual.alternativaMarcada == 'C'}/><label htmlFor="alternativaC" className="realiza_letraAlternativa">C</label>
                            <input type="radio" name="tituloAlternativaC" disabled={true} /><label htmlFor="tituloAlternativaC" className="realiza_tituloAlternativas" id="tituloAlternativaC">{perguntaAtual.alternativaC}</label>
                        </div>
                        <div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaD" type="radio" name="alternativas" value="D" onChange={(event) => onChangeAlternativa(event)} checked={perguntaAtual.alternativaMarcada == 'D'}/><label htmlFor="alternativaD" className="realiza_letraAlternativa">D</label>
                            <input type="radio" name="tituloAlternativaD" disabled={true}/><label htmlFor="tituloAlternativaD" className="realiza_tituloAlternativas" id="tituloAlternativaD">{perguntaAtual.alternativaD}</label>
                        </div>
                        <div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaE" type="radio" name="alternativas" value="E" onChange={(event) => onChangeAlternativa(event)} checked={perguntaAtual.alternativaMarcada == 'E'}/><label htmlFor="alternativaE" className="realiza_letraAlternativa">E</label>
                            <input type="radio" name="tituloAlternativaE" disabled={true}/><label htmlFor="tituloAlternativaE" className="realiza_tituloAlternativas" id="tituloAlternativaE">{perguntaAtual.alternativaE}</label>
                        </div>
                    </form>
                </div>
                <div className="realiza_botoesPerguntasAvancar">
                    <i id="realiza_botaoAvancarPergunta" className="fa-solid fa-chevron-right fa-3x" onClick={() => onclickAvancar()}></i>
                </div>
            </div>
            <div className="realiza_wrapperRodape">
                <h4 id="numeroPerguntas"></h4>
                <button id="btnFinalizar" className="realiza_btn" onclick="onClickFinalizarTeste()"><i className="fa fa-check"></i>Finalizar</button>
                <h4 id="realiza_porcentagemAcertos" className="realiza_porcentagemAcertos"></h4>
            </div></>
        );
};

export default RealizaTestes