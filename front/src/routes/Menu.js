import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

const Menu = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default Menu;