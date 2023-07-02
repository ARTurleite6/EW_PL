import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { instance } from './App';
import InputText from './components/InputText';

const REQUIRED_CAMPS = [
    'email',
    'password',
    'nome',
];

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [nivel, setNivel] = useState('consumidor');

    const navigator = useNavigate();

    const handleNomeChange = (e: string) => {
        setNome(e);
    };

    const handleEmailChange = (e: string) => {
        setEmail(e);
    };

    const handlePasswordChange = (e: string) => {
        setPassword(e);
    };

    const handleNivelChange = (e: string) => {
        setNivel(e);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!email || !password || !nome) {
            alert('Preencha todos os campos');
            return;
        }

        // Perform register logic here
        try {
            await instance.post('/api/authentication/register', {
                email,
                password,
                nome,
                nivel
            });
            navigator('/login');
            console.log('Register form submitted!');
            console.log('Email:', email);
            console.log('Password:', password);
            alert('Register sucessful');
        } catch (error) {
            console.dir(error);
        }
    };

    const goToLoginPage = () => {
        navigator('/login');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center">Register</h1>
                <form onSubmit={handleSubmit} className="mt-4">

                    <InputText required={true} message="Nome" placeholder="Nome" value={nome} onChange={handleNomeChange} />

                    <InputText required={true} message="Email" placeholder="Email" value={email} onChange={handleEmailChange} />

                    <InputText type={"password"} required={true} message="Password" placeholder="Password" value={password} onChange={handlePasswordChange} />

                    <button
                        type="submit"
                        className="w-full mt-6 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Register
                    </button>

                    <button
                        type="button"
                        onClick={goToLoginPage}
                        className="mt-2 text-sm text-blue-500 hover:underline focus:outline-none"
                    >
                        Already have an account? Login
                    </button>
                </form>
            </div>
        </div>
    );

};

export default RegisterPage;
