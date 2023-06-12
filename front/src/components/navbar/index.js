import './styles.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='navbar'>
            <Link to={'home'} className='navItem'>Home</Link>
            <Link to={'testes'} className='navItem'>Testes</Link>
            <Link to={'resultados'} className='navItem'>Resultados</Link>
        </nav>
    );
};

export default NavBar;
