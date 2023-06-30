import './styles.css';
import background from "./img/Hotpot.png";

const HomePage = ({navegaLogin}) => {
       return (
        <>
            <section className='home_bg' >
                <div className='home_bgImage' style={{ backgroundImage: `url(${background})` }}>
                    <div className='home_conteudo'>
                        <h1>Bem vindo a página de Testes</h1>
                        <h2>Realize o login para ter acesso a lista de testes, resultados e a realização dos testes!</h2>
                        <button onClick={() => navegaLogin()}>Login</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;