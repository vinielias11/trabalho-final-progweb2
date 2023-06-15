import './styles.css';
import { useState } from 'react';

const LoginForm = ({ onClickRegistrar, onClickLogar }) => {
    const [registrando, setRegistrando] = useState(false)
    const classNameRegistrar = registrando ? '' : 'slide-up';
    const classNameLogin = registrando ? 'slide-up' : '';

    const [nomeRegistrando, setNomeRegistrando] = useState('');
    const [senhaRegistrando, setSenhaRegistrando] = useState('');
    const [nomeLogando, setNomeLogando] = useState('');
    const [senhaLogando, setSenhaLogando] = useState('');

    const onClickAbaRegistrar = () => {
        setRegistrando(!registrando);
    };

    const onClickAbaLogin = () => {
        setRegistrando(!registrando);
    };

    return (
        <div className='login_wrapper'>
            <div className='form-structor'>
                <div className={'signup ' + classNameRegistrar}>
                    <h2 className='form-title' id='btnRegistrarSlide' onClick={onClickAbaRegistrar}>Registrar</h2>
                    <div className='form-holder'>
                        <input type='text' className='input' placeholder='nome' value={nomeRegistrando} onChange={(e) => setNomeRegistrando(e.target.value)} />
                        <input type='password' className='input' placeholder='senha' value={senhaRegistrando} onChange={(e) => setSenhaRegistrando(e.target.value)} />
                    </div>
                    <button className='submit-btn' onClick={() => onClickRegistrar(nomeRegistrando, senhaRegistrando)}>Registrar</button>
                </div>
                <div className={'login ' + classNameLogin}>
                    <div className='center'>
                        <h2 className='form-title' id='btnLoginSlide' onClick={onClickAbaLogin}>Login</h2>
                        <div className='form-holder'>
                            <input type='text' className='input' placeholder='nome' value={nomeLogando} onChange={(e) => setNomeLogando(e.target.value)} />
                            <input type='password' className='input' placeholder='senha' value={senhaLogando} onChange={(e) => setSenhaLogando(e.target.value)} />
                        </div>
                        <button className='submit-btn' onClick={() => onClickLogar(nomeLogando, senhaLogando)}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;