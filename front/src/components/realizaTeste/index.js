import { useEffect, useState } from 'react';
import './styles.css';
import AuthConsumer from '../../hooks/auth';

const RealizaTestes = ({realizaTeste}) => {   
    const [indicePerguntaAtual, setIndice] = useState(0);
    const [isUltimaPergunta, setUltimaPergunta] = useState(false);
    const [isPrimeiraPergunta, setPrimeiraPergunta] = useState(false);
    const [perguntaAtual, setPergunta] = useState(realizaTeste.perguntas[indicePerguntaAtual]);
    const [altMarcada, setAltMarcada] = useState('')
    const [isFinalizado, setFinalizado] = useState(false)
    const [perguntasCorretas, setPerguntasCorretas] = useState(0)
    const [autenticado] = AuthConsumer()

    useEffect(() => {
        
        setAltMarcada("");
        setPergunta(realizaTeste.perguntas[indicePerguntaAtual]);

        if (indicePerguntaAtual + 1 === realizaTeste.perguntas.length) {
            setUltimaPergunta(true);
          } else {
            setUltimaPergunta(false);
          }

console.log(indicePerguntaAtual)

          if (indicePerguntaAtual === 0) {
            setPrimeiraPergunta(true);
          } else {
            setPrimeiraPergunta(false);
          }

      }, [realizaTeste.perguntas, indicePerguntaAtual, isFinalizado]);

    
    
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
        setFinalizado(true);
        setUltimaPergunta(false);
        alert("Teste finalizado e resultados computados!")
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

        setPerguntasCorretas(perguntasCorretas);

        return {
            idTeste: realizaTeste._id,
            nomeTeste: realizaTeste.nome,
            nomeUsuario: autenticado.nome,
            perguntasTotais: realizaTeste.perguntas.length,
            respostasCorretas: perguntasCorretas,
            porcentagemAcertos: porcentagemDeAcertos,
        }

    }

    const getEstiloA =  () => {
        if (perguntaAtual.alternativaMarcada !== perguntaAtual.alternativaCorreta && isFinalizado && perguntaAtual.alternativaMarcada === 'A') {
            return {backgroundColor: 'red', borderColor: 'red'};
        }else if(perguntaAtual.alternativaCorreta === 'A' && isFinalizado){
            return {backgroundColor: 'green', borderColor: '#41b10e', color: 'white'}
        }
        return {}
    }
    const getEstiloB = () => {
        if (perguntaAtual.alternativaMarcada !== perguntaAtual.alternativaCorreta && isFinalizado && perguntaAtual.alternativaMarcada === 'B') {
            return {backgroundColor: 'red', borderColor: 'red'};
        }else if(perguntaAtual.alternativaCorreta === 'B' && isFinalizado){
            return {backgroundColor: 'green', borderColor: '#41b10e', color: 'white'}
        }

        return {}
    }
    const getEstiloC = () => {
        if (perguntaAtual.alternativaMarcada !== perguntaAtual.alternativaCorreta && isFinalizado && perguntaAtual.alternativaMarcada === 'C') {
            return {backgroundColor: 'red', borderColor: 'red'};
        }else if(perguntaAtual.alternativaCorreta === 'C' && isFinalizado){
            return {backgroundColor: 'green', borderColor: '#41b10e', color: 'white'}
        }

        return {}
    }
    const getEstiloD = () => {
        if (perguntaAtual.alternativaMarcada !== perguntaAtual.alternativaCorreta && isFinalizado && perguntaAtual.alternativaMarcada === 'D') {
            return {backgroundColor: 'red', borderColor: 'red'};
        }else if(perguntaAtual.alternativaCorreta === 'D' && isFinalizado){
            return {backgroundColor: 'green', borderColor: '#41b10e', color: 'white'}
        }

        return {}
    }
    const getEstiloE = () => {
        if (perguntaAtual.alternativaMarcada !== perguntaAtual.alternativaCorreta && isFinalizado && perguntaAtual.alternativaMarcada === 'E') {
            return {backgroundColor: 'red', borderColor: 'red'};
        }else if(perguntaAtual.alternativaCorreta === 'E' && isFinalizado){
            return {backgroundColor: 'green', borderColor: '#41b10e', color: 'white'}
        }

        return {}
    }

    return (
            <>
            <div className="realiza_wrapperCabecalho">
                <h4 id="realiza_tituloTeste" className="tituloTeste">{realizaTeste.nome}</h4>
            </div>
            <div className="realiza_wrapperPergunta">
                <div className="realiza_botoesPerguntasVoltar">
                {!isPrimeiraPergunta &&(
                    <i id="realiza_botaoVoltarPergunta" className="fa-solid fa-chevron-left fa-3x" onClick={() => onclickVoltar()}></i>
                )} 
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
                            <input id="alternativaA" type="radio" name="alternativas" value="A" disabled={isFinalizado} checked={perguntaAtual.alternativaMarcada === 'A'} onChange={(event) => handleClick(event.target.value)} /> <label style={getEstiloA()} htmlFor="alternativaA" className="realiza_letraAlternativa">A</label>
                            <input type="radio" name="tituloAlternativaA" disabled={true} /><label htmlFor="tituloAlternativaA" className="realiza_tituloAlternativas" id="tituloAlternativaA">{perguntaAtual.alternativaA}</label>
                        </div><div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaB" type="radio" name="alternativas" value="B" disabled={isFinalizado} checked={perguntaAtual.alternativaMarcada === 'B'} onChange={(event) => handleClick(event.target.value)} /> <label style={getEstiloB()} htmlFor="alternativaB" className="realiza_letraAlternativa">B</label>
                            <input type="radio" name="tituloAlternativaB" disabled={true} /><label htmlFor="tituloAlternativaB" className="realiza_tituloAlternativas" id="tituloAlternativaB">{perguntaAtual.alternativaB}</label>
                        </div><div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaC" type="radio" name="alternativas" value="C" disabled={isFinalizado} checked={perguntaAtual.alternativaMarcada === 'C'} onChange={(event) => handleClick(event.target.value)} /> <label style={getEstiloC()} htmlFor="alternativaC" className="realiza_letraAlternativa">C</label>
                            <input type="radio" name="tituloAlternativaC" disabled={true} /><label htmlFor="tituloAlternativaC" className="realiza_tituloAlternativas" id="tituloAlternativaC">{perguntaAtual.alternativaC}</label>
                        </div><div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaD" type="radio" name="alternativas" value="D" disabled={isFinalizado} checked={perguntaAtual.alternativaMarcada === 'D'} onChange={(event) => handleClick(event.target.value)} /> <label style={getEstiloD()} htmlFor="alternativaD" className="realiza_letraAlternativa">D</label>
                            <input type="radio" name="tituloAlternativaD" disabled={true} /><label htmlFor="tituloAlternativaD" className="realiza_tituloAlternativas" id="tituloAlternativaD">{perguntaAtual.alternativaD}</label>
                        </div><div className="realiza_row realiza_linha_alternativa">
                            <input id="alternativaE" type="radio" name="alternativas" value="E" disabled={isFinalizado} checked={perguntaAtual.alternativaMarcada === 'E'} onChange={(event) => handleClick(event.target.value)} /> <label style={getEstiloE()} htmlFor="alternativaE" className="realiza_letraAlternativa">E</label>
                            <input type="radio" name="tituloAlternativaE" disabled={true} /><label htmlFor="tituloAlternativaE" className="realiza_tituloAlternativas" id="tituloAlternativaE">{perguntaAtual.alternativaE}</label>
                        </div>
                    </form>
                </div>
                <div className="realiza_botoesPerguntasAvancar">
                {!isUltimaPergunta && (
                    <i id="realiza_botaoAvancarPergunta" className="fa-solid fa-chevron-right fa-3x" onClick={() => onclickAvancar()}></i>
                )}
                </div>
            </div>
            <div className="realiza_wrapperRodape">
                <h4 id="numeroPerguntas">Pergunta {indicePerguntaAtual + 1} / {realizaTeste.perguntas.length}</h4>
                {isUltimaPergunta && !isFinalizado && (
                    <button id="btnFinalizar" className="realiza_btn" onClick={() => onClickFinalizarTeste()}><i className="fa fa-check"></i>Finalizar</button>
                )}
                {isFinalizado && (
                    <>
                        <h4 id="porcentagemAcertos">Porcentagem de Acertos: {((perguntasCorretas / realizaTeste.perguntas.length) * 100).toFixed(2)}%</h4>
                        <h4>Quantidade de Acertos: {perguntasCorretas} / {realizaTeste.perguntas.length}</h4>
                    </>
                )}
                <h4 id="realiza_porcentagemAcertos" className="realiza_porcentagemAcertos"></h4>
            </div></>
        );
};

export default RealizaTestes