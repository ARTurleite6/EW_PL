import { useState, useEffect } from "react";
import { instance } from "./App";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { JwtToken } from "./ProtectedRoute";
import jwt from 'jwt-decode';
import GenereFormComponent, { Genere } from "./components/GenereFormComponent";
import { useNavigate } from "react-router-dom";
import LogoutComponent from "./components/LogoutComponent";

const EditGenesePage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [genese, setGenese] = useState<Genere | null>(null);

    const [cookies, setCookie] = useCookies(['jwtToken']);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        instance
            .get(`http://localhost:7777/api/genesis/${id}`)
            .then((response) => {
                setGenese(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        if (!cookies.jwtToken) {
            navigate("/login");
        }
        const payload = jwt<JwtToken>(cookies.jwtToken);
        setUsername(payload.user.name);

    }, [id, cookies.jwtToken, navigate]);

    if (genese) {
        return (
            <LogoutComponent>
                <GenereFormComponent genereEntry={genese} username={jwt<JwtToken>(cookies.jwtToken).user.name} />
            </LogoutComponent>
        );
    } else {
        return (
            <p>Loading...</p>
        );
    }
};

export default EditGenesePage;
