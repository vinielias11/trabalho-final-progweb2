import { useEffect, useState } from 'react';
import './styles.css';
import AuthConsumer from '../../hooks/auth';

const RealizaTestes = ({ teste }) => {
    const [indicePerguntaAtual, setIndice] = useState(0);
    const [isUltimaPergunta, setUltimaPergunta] = useState(false);
    const [isPrimeiraPergunta, setPrimeiraPergunta] = useState(false);
    const [perguntaAtual, setPergunta] = useState(teste.perguntas[indicePerguntaAtual]);
    const [, setAltMarcada] = useState('')
    const [isFinalizado, setFinalizado] = useState(false)
    const [perguntasCorretas, setPerguntasCorretas] = useState(0)
    const [autenticado] = AuthConsumer()

    useEffect(() => {
        setAltMarcada("");

        setPergunta(teste.perguntas[indicePerguntaAtual]);

        setUltimaPergunta(indicePerguntaAtual + 1 === teste.perguntas.length);

        setPrimeiraPergunta(indicePerguntaAtual === 0);
    }, [teste.perguntas, indicePerguntaAtual, isFinalizado]);

    const onclickAvancar = () => {
        if (indicePerguntaAtual < teste.perguntas.length - 1) {
            setIndice(indicePerguntaAtual + 1);
        }
    };

    const onclickVoltar = () => {
        if (indicePerguntaAtual > 0) {
            setIndice(indicePerguntaAtual - 1);
        }
    };

    const onChangeAlternativa = (alt) => {
        setAltMarcada(alt);

        perguntaAtual.alternativaMarcada = alt;
    };

    const onClickFinalizarTeste = () => {
        criarResultado();

        setFinalizado(true);
        setUltimaPergunta(false);

        alert("Teste finalizado e resultados computados!")
    };

    const criarResultado = async () => {
        const resp = await fetch(`/resultado/Criar`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(getResultado())
        });

        return await resp.json();
    };

    const getResultado = () => {
        let perguntasCorretas = 0;

        for (let i = 0; i < teste.perguntas.length; i++) {
            const altMarcadaFinal = teste.perguntas[i].alternativaMarcada;
            const altCorretaFinal = teste.perguntas[i].alternativaCorreta;

            if (altMarcadaFinal === altCorretaFinal) {
                perguntasCorretas++;
            }
        }

        let porcentagemDeAcertos = ((perguntasCorretas / teste.perguntas.length) * 100).toFixed(2);

        setPerguntasCorretas(perguntasCorretas);

        return {
            idTeste: teste._id,
            nomeTeste: teste.nome,
            nomeUsuario: autenticado.nome,
            perguntasTotais: teste.perguntas.length,
            respostasCorretas: perguntasCorretas,
            porcentagemAcertos: porcentagemDeAcertos,
        }
    };

    const estiloAlternativaCorreta = {
        backgroundColor: 'green',
        borderColor: '#41b10e',
        color: 'white'
    };

    const estiloAlternativaErrada = {
        backgroundColor: 'red',
        borderColor: 'red'
    };

    const isAlternativaCorreta = (alternativa) => {
        return perguntaAtual.alternativaCorreta === alternativa && isFinalizado;
    };

    const isAlternativaErrada = (alternativa) => {
        return perguntaAtual.alternativaMarcada !== perguntaAtual.alternativaCorreta && isFinalizado && perguntaAtual.alternativaMarcada === alternativa;
    };

    const getEstiloA = () => {
        return isAlternativaCorreta('A') ? estiloAlternativaCorreta : isAlternativaErrada('A') ? estiloAlternativaErrada : {};
    };

    const getEstiloB = () => {
        return isAlternativaCorreta('B') ? estiloAlternativaCorreta : isAlternativaErrada('B') ? estiloAlternativaErrada : {};
    };

    const getEstiloC = () => {
        return isAlternativaCorreta('C') ? estiloAlternativaCorreta : isAlternativaErrada('C') ? estiloAlternativaErrada : {};
    };

    const getEstiloD = () => {
        return isAlternativaCorreta('D') ? estiloAlternativaCorreta : isAlternativaErrada('D') ? estiloAlternativaErrada : {};
    };

    const getEstiloE = () => {
        return isAlternativaCorreta('E') ? estiloAlternativaCorreta : isAlternativaErrada('E') ? estiloAlternativaErrada : {};
    };

    return (
        <>
            <div className='realiza_wrapperCabecalho'>
                <h4 id='realiza_tituloTeste' className='tituloTeste'>{teste.nome}</h4>
            </div>
            <div className='realiza_wrapperPergunta'>
                <div className='realiza_botoesPerguntasVoltar'>
                    {!isPrimeiraPergunta && (
                        <i id='realiza_botaoVoltarPergunta' className='fa-solid fa-chevron-left fa-3x' onClick={() => onclickVoltar()}></i>
                    )}
                </div>
                <div className='realiza_container' id='containerFormTeste'>
                    <form id='formTestes'>
                        <div className='realiza_row'>
                            <h4 id='realiza_tituloPergunta'>{perguntaAtual.titulo}</h4>
                        </div>
                        <div className='realiza_row'>
                            <h4>Resposta</h4>
                        </div>
                        <div className='realiza_row realiza_linha_alternativa'>
                            <input id='alternativaA' type='radio' name='alternativas' value='A' disabled={isFinalizado} checked={perguntaAtual.alternativaMarcada === 'A'} onChange={(event) => onChangeAlternativa(event.target.value)} /> <label style={getEstiloA()} htmlFor='alternativaA' className='realiza_letraAlternativa'>A</label>
                            <input type='radio' name='tituloAlternativaA' disabled={true} /><label htmlFor='tituloAlternativaA' className='realiza_tituloAlternativas' id='tituloAlternativaA'>{perguntaAtual.alternativaA}</label>
                        </div><div className='realiza_row realiza_linha_alternativa'>
                            <input id='alternativaB' type='radio' name='alternativas' value='B' disabled={isFinalizado} checked={perguntaAtual.alternativaMarcada === 'B'} onChange={(event) => onChangeAlternativa(event.target.value)} /> <label style={getEstiloB()} htmlFor='alternativaB' className='realiza_letraAlternativa'>B</label>
                            <input type='radio' name='tituloAlternativaB' disabled={true} /><label htmlFor='tituloAlternativaB' className='realiza_tituloAlternativas' id='tituloAlternativaB'>{perguntaAtual.alternativaB}</label>
                        </div><div className='realiza_row realiza_linha_alternativa'>
                            <input id='alternativaC' type='radio' name='alternativas' value='C' disabled={isFinalizado} checked={perguntaAtual.alternativaMarcada === 'C'} onChange={(event) => onChangeAlternativa(event.target.value)} /> <label style={getEstiloC()} htmlFor='alternativaC' className='realiza_letraAlternativa'>C</label>
                            <input type='radio' name='tituloAlternativaC' disabled={true} /><label htmlFor='tituloAlternativaC' className='realiza_tituloAlternativas' id='tituloAlternativaC'>{perguntaAtual.alternativaC}</label>
                        </div><div className='realiza_row realiza_linha_alternativa'>
                            <input id='alternativaD' type='radio' name='alternativas' value='D' disabled={isFinalizado} checked={perguntaAtual.alternativaMarcada === 'D'} onChange={(event) => onChangeAlternativa(event.target.value)} /> <label style={getEstiloD()} htmlFor='alternativaD' className='realiza_letraAlternativa'>D</label>
                            <input type='radio' name='tituloAlternativaD' disabled={true} /><label htmlFor='tituloAlternativaD' className='realiza_tituloAlternativas' id='tituloAlternativaD'>{perguntaAtual.alternativaD}</label>
                        </div><div className='realiza_row realiza_linha_alternativa'>
                            <input id='alternativaE' type='radio' name='alternativas' value='E' disabled={isFinalizado} checked={perguntaAtual.alternativaMarcada === 'E'} onChange={(event) => onChangeAlternativa(event.target.value)} /> <label style={getEstiloE()} htmlFor='alternativaE' className='realiza_letraAlternativa'>E</label>
                            <input type='radio' name='tituloAlternativaE' disabled={true} /><label htmlFor='tituloAlternativaE' className='realiza_tituloAlternativas' id='tituloAlternativaE'>{perguntaAtual.alternativaE}</label>
                        </div>
                    </form>
                </div>
                <div className='realiza_botoesPerguntasAvancar'>
                    {!isUltimaPergunta && (
                        <i id='realiza_botaoAvancarPergunta' className='fa-solid fa-chevron-right fa-3x' onClick={() => onclickAvancar()}></i>
                    )}
                </div>
            </div>
            <div className='realiza_wrapperRodape'>
                <h4 id='numeroPerguntas'>Pergunta {indicePerguntaAtual + 1} / {teste.perguntas.length}</h4>
                {isUltimaPergunta && !isFinalizado && (
                    <button id='btnFinalizar' className='realiza_btn' onClick={() => onClickFinalizarTeste()}><i className='fa fa-check'></i>Finalizar</button>
                )}
                {isFinalizado && (
                    <>
                        <h4 id='porcentagemAcertos'>Porcentagem de Acertos: {((perguntasCorretas / teste.perguntas.length) * 100).toFixed(2)}%</h4>
                        <h4>Quantidade de Acertos: {perguntasCorretas} / {teste.perguntas.length}</h4>
                    </>
                )}
                <h4 id='realiza_porcentagemAcertos' className='realiza_porcentagemAcertos'></h4>
            </div></>
    );
};

export default RealizaTestes