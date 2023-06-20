import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [nivel, setNivel] = useState('consumidor');

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

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nome" className="block mb-1 font-medium">
                            Nome
                        </label>
                        <input
                            type="nome"
                            id="nome"
                            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            value={nome}
                            onChange={handleNomeChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nivel" className="block mb-1 font-medium">
                            Nivel
                        </label>
                        <select
                            id="nivel"
                            className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                            value={nivel}
                            onChange={handleNivelChange}
                            required
                        >
                            <option value="consumidor">Consumidor</option>
                            <option value="administrador">Administrador</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
