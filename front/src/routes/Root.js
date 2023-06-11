import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

const Root = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default Root;