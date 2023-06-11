import './styles.css';

const ListaResultados = ({ resultados }) => {
    return (
        <div className="resultados_container">
            <ul className="resultados_responsive_table">
                <li className="resultados_table_header">
                    <div className="col col-1">ID</div>
                    <div className="col col-2">Nome do usuário</div>
                    <div className="col col-3">Nome do teste</div>
                    <div className="col col-4">Numero de Acertos</div>
                    <div className="col col-5">Porcentagem </div>
                </li>
                {resultados.map(resultado => (
                    <li key={resultado._id} className='resultados_table_row'>
                        <div className='col col-1'>{resultado._id}</div>
                        <div className='col col-2'>{resultado.nomeUsuario}</div>
                        <div className='col col-3'>{resultado.nomeTeste}</div>
                        <div className='col col-4'>{`${resultado.respostasCorretas} / ${resultado.perguntasTotais}`}</div>
                        <div className='col col-5'>{resultado.porcentagemAcertos}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaResultados;