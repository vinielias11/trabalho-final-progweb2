import { createContext, useContext, useReducer } from 'react';
import { useLocation, Navigate } from "react-router-dom";

const estadoInicial = { logado: false, nome: '', admin: false };
const authContext = createContext(estadoInicial);

export function reducer(estado, acao) {
    switch (acao.tipo) {
        case 'login':
            return { logado: true, nome: acao.nome, admin: acao.admin };
        case 'logout':
            return { logado: false, nome: '', admin: false };
        default:
            throw new Error('Nenhuma ação especificada para o estado de autenticação.');
    }
};

export function AuthProvider({ children }) {
    const [autenticado, autenticar] = useReducer(reducer, estadoInicial);

    return <authContext.Provider value={[autenticado, autenticar]}>{children}</authContext.Provider>
};

export default function AuthConsumer() {
    return useContext(authContext);
};

export function RequireAuth({ children }) {
    const [autenticado] = AuthConsumer();
    const location = useLocation();

    return autenticado.logado === true ? (children) : (<Navigate to={'/login'} replace state={{ path: location.pathname }}></Navigate>);
};