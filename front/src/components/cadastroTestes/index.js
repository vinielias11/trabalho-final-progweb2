import { useEffect, useState } from 'react';
import './styles.css';
import CadastroPerguntas from '../cadastroPerguntas';
import { useNavigate } from 'react-router-dom';

const CadastroTestes = ({ isAberto, fechaCadastro, testeEditando }) => {
    const [nome, setNome] = useState('');
    const [materia, setMateria] = useState('');
    const [dificuldade, setDificuldade] = useState('');
    const [perguntas, setPerguntas] = useState([]);
    const navigate = useNavigate();

    const [cadastrandoPergunta, setCadastrandoPergunta] = useState(false);
    const [perguntaEditando, setPerguntaEditando] = useState({ titulo: '', alternativaA: '', alternativaB: '', alternativaC: '', alternativaD: '', alternativaE: '', alternativaCorreta: 'A' });

    useEffect(() => {
        setNome(testeEditando.nome);
        setMateria(testeEditando.materia);
        setDificuldade(testeEditando.dificuldade);
        setPerguntas(testeEditando.perguntas);
    }, [testeEditando]);

    const onClickEditarPergunta = (pergunta) => {
        setPerguntaEditando(pergunta);
        setCadastrandoPergunta(true);
    };

    const onClickExcluirPergunta = (idPergunta) => {
        const perguntasRestantes = perguntas.filter(item => item.id !== idPergunta);

        if (perguntas.length === 0) return;

        for (let i = 0; i < perguntasRestantes.length; i++) {
            perguntasRestantes[i].id = i + 1;
        }

        setPerguntas(perguntasRestantes);
    };

    const fecharCadastroPergunta = () => {
        setCadastrandoPergunta(false);
        setPerguntaEditando({ titulo: '', alternativaA: '', alternativaB: '', alternativaC: '', alternativaD: '', alternativaE: '', alternativaCorreta: 'A' });
    };

    const onClickSalvarTeste = async () => {
        let objResponse;

        if (nome.trim() === '' || materia.trim() === '' || dificuldade.trim() === '' || perguntas.length === 0) return;

        if (!testeEditando._id) {
            objResponse = await criarTeste();
        } else {
            objResponse = await atualizarTeste();
        }

        if (objResponse.status !== "OK") {
            alert(objResponse.erro);
        }

        fechaCadastro();
        navigate("/menu/testes");
    };

    const criarTeste = async () => {
        const resp = await fetch(`/teste/Criar`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(getTeste())
        });

        return await resp.json();
    };

    const atualizarTeste = async () => {
        const resp = await fetch(`/teste/Atualizar/${testeEditando._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(getTeste())
        });

        return await resp.json();
    };

    const getTeste = () => {
        return { nome, materia, dificuldade, perguntas };
    };

    if (isAberto) {
        return (
            <>
                <div className='background_cadastro_testes'>
                    <div className='cadastro_testes_container'>
                        <form>
                            <div className='row' style={{ flexDirection: 'row-reverse' }}>
                                <div className='input-icon'><i className='fa fa-x' style={{ marginTop: '20px', cursor: 'pointer' }} onClick={fechaCadastro}></i></div>
                            </div>
                            <div className='row'>
                                <h4>Teste</h4>
                                <div className='input-group input-group-icon'>
                                    <input type='text' placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)} />
                                    <div className='input-icon'>
                                        <i className='fa fa-pen'></i>
                                    </div>
                                </div>
                                <div className='input-group input-group-icon'>
                                    <input type='text' placeholder='Matéria/Assunto' value={materia} onChange={(e) => setMateria(e.target.value)} />
                                    <div className='input-icon'>
                                        <i className='fa fa-graduation-cap'></i>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div>
                                    <h4>Dificuldade</h4>
                                    <div className='input-group'>
                                        <input id='dificuldade-facil' type='radio' name='dificuldade' value='Fácil' checked={dificuldade === 'Fácil'} onChange={(e) => setDificuldade(e.target.value)} /><label htmlFor='dificuldade-facil'>Fácil</label>
                                        <input id='dificuldade-media' type='radio' name='dificuldade' value='Média' checked={dificuldade === 'Média'} onChange={(e) => setDificuldade(e.target.value)} /><label htmlFor='dificuldade-media'>Média</label>
                                        <input id='dificuldade-dificil' type='radio' name='dificuldade' value='Difícil' checked={dificuldade === 'Difícil'} onChange={(e) => setDificuldade(e.target.value)} /><label htmlFor='dificuldade-dificil'>Difícil</label>
                                        <input id='dificuldade-expert' type='radio' name='dificuldade' value='Expert' checked={dificuldade === 'Expert'} onChange={(e) => setDificuldade(e.target.value)} /><label htmlFor='dificuldade-expert'>Expert</label>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <h4>Perguntas</h4>
                            </div>
                            {perguntas.map(pergunta => (
                                <div className='row' style={{ flexDirection: 'row' }}>
                                    <div className='col-89-porcento' onClick={() => onClickEditarPergunta(pergunta)}>
                                        <div className='input-group input-group-icon'>
                                            <input placeholder={pergunta.titulo} style={{ cursor: 'pointer' }} disabled={true}></input>
                                            <div className='input-icon'><b style={{ color: '#b9b9b9' }}>{pergunta.id}</b></div>
                                        </div>
                                    </div>
                                    <div className='col-11-porcento' style={{ cursor: 'pointer' }} onClick={() => onClickExcluirPergunta(pergunta.id)}>
                                        <div className='input-group input-group-icon'>
                                            <div className='input-icon'><i className='fa fa-trash'></i></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='row'>
                                <div className='input-group input-group-icon' onClick={() => setCadastrandoPergunta(true)}>
                                    <input type='text' placeholder='Adicionar pergunta' disabled={true} id='inputAdicionarPergunta' />
                                    <div className='input-icon'>
                                        <i className='fa fa-plus'></i>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className='row'>
                            <div className='input-group'>
                                <input type='radio' disabled={true} /><label id='botaoEsconder'><span><i className=''></i></span></label>
                                <input type='radio' checked={true} readOnly={true} /><label id='botaoSalvarPergunta' onClick={() => { onClickSalvarTeste() }}><span><i className='fa fa-save'></i>Salvar</span></label>
                            </div>
                        </div>
                    </div>
                </div>

                <CadastroPerguntas
                    isCadastrandoPergunta={cadastrandoPergunta}
                    fechaCadastroPergunta={fecharCadastroPergunta}
                    perguntasExistentes={perguntas}
                    perguntaEditando={perguntaEditando}
                />
            </>
        );
    }

    return null;
};

export default CadastroTestes;