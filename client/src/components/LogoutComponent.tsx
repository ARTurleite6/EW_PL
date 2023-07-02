import { ReactElement } from "react";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

const LogoutComponent = ({ children }: { children: ReactElement }) => {

    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(['jwtToken']);

    const handleLogout = () => {
        navigate("/login");
        removeCookie("jwtToken");
    }

    return (
        <>
            <div className={"flex justify-end mr-52 mt-8"} >
                <button onClick={handleLogout} className="mr-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 self-center">
                    Logout
                </button>
            </div>
            {children}
        </>

    );
}

export default LogoutComponent;
