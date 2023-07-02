import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { instance } from './App';

const LoginPage: React.FC = () => {

    const [cookies, setCookie, removeCookie] = useCookies(['jwtToken']);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (cookies.jwtToken) {
            //remove cookie
            removeCookie('jwtToken', { path: '/' });
        }
    }, [cookies.jwtToken, navigate, removeCookie]);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await instance.post('/api/authentication/login', {
                email,
                password,
            });
            alert('Login sucessful');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const goToRegisterPage = () => {
        navigate('/register');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center">Login</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />

                    <label htmlFor="password" className="block mt-3 mb-2 font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full mt-6 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={goToRegisterPage}
                        className="mt-2 text-sm text-blue-500 hover:underline focus:outline-none"
                    >
                        Don't have an account? Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
