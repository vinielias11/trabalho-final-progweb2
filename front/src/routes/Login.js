import LoginForm from "../components/loginForm";
import AuthConsumer from "../hooks/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [, autenticar] = AuthConsumer();
    const navigate = useNavigate();

    const onClickRegistrar = async (nomeRegistrando, senhaRegistrando) => {
        if (nomeRegistrando.trim().length === 0 || senhaRegistrando.trim().length === 0) return;

        const resp = await fetch('/usuario/Registrar', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nomeRegistrando,
                senha: senhaRegistrando
            })
        });

        const objResponse = await resp.json();

        if (objResponse.status !== 'OK') {
            alert(objResponse.erro);
            return;
        }

        alert('Usuário registrado com sucesso!');
    };

    const onClickLogar = async (nomeLogando, senhaLogando) => {
        if (nomeLogando.trim().length === 0 || senhaLogando.trim().length === 0) return;

        const resp = await fetch('/usuario/Login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nomeLogando,
                senha: senhaLogando
            })
        });

        const objResponse = await resp.json();

        if (objResponse.status !== 'OK') {
            alert(objResponse.erro);
            return;
        }
        
        autenticar({ tipo: 'login', nome: objResponse.nome, admin: objResponse.admin });
        navigate('/menu/testes', { replace: true });
    };

    return (
        <LoginForm onClickRegistrar={onClickRegistrar} onClickLogar={onClickLogar} />
    );
};

export default Login;