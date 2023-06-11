import { useEffect, useState } from 'react';
import './styles.css';

const CadastroPerguntas = ({ isCadastrandoPergunta, fechaCadastroPergunta, perguntasExistentes, perguntaEditando }) => {
    const [titulo, setTitulo] = useState('');
    const [alternativaA, setAlternativaA] = useState('');
    const [alternativaB, setAlternativaB] = useState('');
    const [alternativaC, setAlternativaC] = useState('');
    const [alternativaD, setAlternativaD] = useState('');
    const [alternativaE, setAlternativaE] = useState('');
    const [alternativaCorreta, setAlternativaCorreta] = useState('A');

    useEffect(() => {
        setTitulo(perguntaEditando.titulo);
        setAlternativaA(perguntaEditando.alternativaA);
        setAlternativaB(perguntaEditando.alternativaB);
        setAlternativaC(perguntaEditando.alternativaC);
        setAlternativaD(perguntaEditando.alternativaD);
        setAlternativaE(perguntaEditando.alternativaE);
        setAlternativaCorreta(perguntaEditando.alternativaCorreta);
    }, [perguntaEditando]);

    const onClickSalvarPergunta = () => {
        const pergunta = { titulo, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta };

        if (Object.values(pergunta).some(item => item === '')) return;
        
        if (!perguntaEditando.id) {
            pergunta.id = perguntasExistentes.length + 1;
            perguntasExistentes.push(pergunta);
        } else {
            for (let i = 0; i < perguntasExistentes.length; i++) {
                pergunta.id = perguntaEditando.id;
                
                if (perguntaEditando.id === perguntasExistentes[i].id) {
                    perguntasExistentes[i] = pergunta;
                }
            }
        }

        fechaCadastroPergunta();
    };

    if (isCadastrandoPergunta) {
        return (
            <div className='background_cadastro_perguntas'>
                <div className="cadastro_testes_container">
                    <form>
                        <div className="row">
                            <div className="input-icon"><i className="fa fa-arrow-left" id="iconeVoltarTeste" onClick={fechaCadastroPergunta}></i></div>
                        </div>
                        <div className="row">
                            <h4>Pergunta</h4>
                            <div className="input-group input-group-icon">
                                <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                                <div className="input-icon">
                                    <i className="fa fa-pen"></i>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <h4>Alternativas</h4>
                        </div>
                        <div className="row">
                            <div className="input-group input-group-icon">
                                <input type="text" placeholder="..." value={alternativaA} onChange={(e) => setAlternativaA(e.target.value)} />
                                <div className="input-icon">
                                    <i className="fa fa-a"></i>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group-icon">
                                <input type="text" placeholder="..." value={alternativaB} onChange={(e) => setAlternativaB(e.target.value)} />
                                <div className="input-icon">
                                    <i className="fa fa-b"></i>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group-icon">
                                <input type="text" placeholder="..." value={alternativaC} onChange={(e) => setAlternativaC(e.target.value)} />
                                <div className="input-icon">
                                    <i className="fa fa-c"></i>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group-icon">
                                <input type="text" placeholder="..." value={alternativaD} onChange={(e) => setAlternativaD(e.target.value)} />
                                <div className="input-icon">
                                    <i className="fa fa-d"></i>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group-icon">
                                <input type="text" placeholder="..." value={alternativaE} onChange={(e) => setAlternativaE(e.target.value)} />
                                <div className="input-icon">
                                    <i className="fa fa-e"></i>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <h4>Alternativa correta</h4>
                            <div className="col-half">
                                <div className="input-group">
                                    <select id="selectAlternativaCorreta" value={alternativaCorreta} onChange={(e) => setAlternativaCorreta(e.target.value)}>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="E">E</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group">
                                <input type="radio" disabled={true} /><label id="botaoEsconder"><span><i className=""></i></span></label>
                                <input type="radio" readOnly={true} checked={true} /><label id="botaoSalvarPergunta" onClick={onClickSalvarPergunta}><span><i className="fa fa-save"></i>Salvar</span></label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return null;
}

export default CadastroPerguntas;