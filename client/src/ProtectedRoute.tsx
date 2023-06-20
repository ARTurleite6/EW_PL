import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
    const [ cookies, setCookie ] = useCookies(['jwtToken']);
    const navigator = useNavigate(); 
    React.useEffect(() => {
        const jwtToken = cookies.jwtToken;
        console.log(cookies);
        if (!jwtToken) {
            navigator('/login');
        }
    })

    return children;
}

export default ProtectedRoute;