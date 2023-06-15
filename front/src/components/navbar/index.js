import './styles.css';
import { Link } from 'react-router-dom';
import AuthConsumer from '../../hooks/auth';

const NavBar = () => {
    const [autenticado, autenticar] = AuthConsumer();

    const onClickSair = () => {
        autenticar({ tipo: 'logout' });
    };

    return (
        <nav className='navbar'>
            <Link to={'home'} className='navItem'>Home</Link>
            <Link to={'testes'} className='navItem'>Testes</Link>
            <Link to={'resultados'} className='navItem'>Resultados</Link>
            <p className='navItem navItemDireita'>{`Bem vindo, ${autenticado.nome}!`}</p>
            <p className='navItem' style={{ cursor: 'pointer' }} onClick={() => onClickSair()}>Sair</p>
        </nav>
    );
};

export default NavBar;
