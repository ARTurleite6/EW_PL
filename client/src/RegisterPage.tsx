import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [nivel, setNivel] = useState('consumidor');

    const navigator = useNavigate();

    const handleNomeChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNome(e.target.value);
    };

    const handleEmailChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleNivelChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setNivel(e.target.value);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Perform register logic here
        console.log('Register form submitted!');
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const goToLoginPage = () => {
        navigator('/login');
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center">Register</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <label htmlFor="Nome" className="block mb-2 font-medium text-gray-700">
                        Nome
                    </label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={nome}
                        onChange={handleNomeChange}
                        className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />

                    <label htmlFor="email" className="block mt-3 mb-2 font-medium text-gray-700">
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

                    <label htmlFor="nivel" className="block mt-3 mb-2 font-medium text-gray-700">
                        User Type
                    </label>
                    <select
                        id="nivel"
                        name="nivel"
                        value={nivel}
                        onChange={handleNivelChange}
                        className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="consumidor">Consumer</option>
                        <option value="administrador">Administrator</option>
                    </select>


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
