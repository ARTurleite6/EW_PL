import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import axios from 'axios';
import ListPage from './ListPage';
import GenesePage from './GenesePage';
import ProtectedRoute from './ProtectedRoute';
import RegisterPage from './RegisterPage';
import EditGenesePage from './EditGenerePage';

export const instance = axios.create({
    baseURL: 'http://localhost:7777',
    withCredentials: true,
});

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <ProtectedRoute>
                        <ListPage />
                    </ProtectedRoute>
                } />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/genesis/edit/:id' element={<EditGenesePage />} />
                <Route path='/genesis/:id' element={
                    <ProtectedRoute>
                        <GenesePage />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
};

export default App;
