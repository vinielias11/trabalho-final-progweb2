import HomePage from "../components/homePage";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();

    const navegaLogin = () => {
        console.log("navegando");
        navigate('/login');
    }
    
    return (
        <>
            <HomePage navegaLogin={navegaLogin}/>
        </>
    );
};
export default Home