import { useState, useEffect } from "react";
import { instance } from "./App";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { JwtToken } from "./ProtectedRoute";
import jwt from 'jwt-decode';
import GenereFormComponent, { Genere } from "./components/GenereFormComponent";

const EditGenesePage = () => {

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

        const payload = jwt<JwtToken>(cookies.jwtToken);
        setUsername(payload.user.name);

    }, [id, cookies.jwtToken]);

    if (genese) {
        return (
            <GenereFormComponent genereEntry={genese} username={username} />
        );
    } else {
        return (
            <p>Loading...</p>
        );
    }
};

export default EditGenesePage;

