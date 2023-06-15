import './styles.css';

const ListaTestes = ({ testes, editarTeste, deletarTeste, realizaTeste }) => {
    return (
        <div className="testes_container">
            <ul className="testes_responsive_table">
                <li className="testes_table_header">
                    <div className="col col-1">ID</div>
                    <div className="col col-2">Nome</div>
                    <div className="col col-3">Matéria / Assunto</div>
                    <div className="col col-4">Dificuldade</div>
                    <div className="col col-5">Perguntas </div>
                    <div className="col col-icon"></div>
                    <div className="col col-icon"></div>
                    <div className="col col-icon"></div>
                </li>
                {testes.map(teste => (
                    <li key={teste._id} className='testes_table_row'>
                        <div className='col col-1'>{teste._id}</div>
                        <div className='col col-2'>{teste.nome}</div>
                        <div className='col col-3'>{teste.materia}</div>
                        <div className='col col-4'>{teste.dificuldade}</div>
                        <div className='col col-5'>{teste.perguntas.length}</div>
                        <div className='col col-icon'><i className='fa fa-edit' style={{ cursor: 'pointer' }} onClick={() => editarTeste(teste)}></i></div>
                        <div className='col col-icon'><i className='fa fa-trash' style={{ color: 'red', cursor: 'pointer' }} onClick={() => deletarTeste(teste._id)}></i></div>
                        <div className='col col-icon'><i className='fa fa-play' style={{ color: 'green', cursor: 'pointer' }} onClick={() => realizaTeste(teste._id)}></i></div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaTestes;