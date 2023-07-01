import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt from 'jwt-decode';

export interface JwtToken {
    user: {
        userType: string;
        name: string;
    }
}

const ProtectedRoute = ({ children, role }: { children: ReactElement, role?: string }) => {
    const [cookies, setCookie] = useCookies(['jwtToken']);
    const [authorized, setAuthorized] = useState(true);
    const navigator = useNavigate();
    useEffect(() => {
        const jwtToken = cookies.jwtToken;
        if (!jwtToken) {
            navigator('/login');
        }

        const payload = jwt<JwtToken>(jwtToken);

        if (role && role !== payload.user.userType) {
            setAuthorized(false);
        }
    }, [cookies.jwtToken, role, navigator]);

    if (authorized) {
        return children;
    } else {
        return <p>Not authorized</p>;
    }
}

export default ProtectedRoute;
