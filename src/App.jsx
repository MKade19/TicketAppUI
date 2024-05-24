import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import './App.css';

import AuthContext from './Context/AuthContext'
import Layout from './Layout/Layout';
import HomePage from './Pages/HomePage';
import AuthLayout from './Layout/AuthLayout';
import SignInPage from './Pages/SignInPage';
import ChangePasswordPage from './Pages/ChangePasswordPage';
import SignUpPage from './Pages/SignUpPage';


const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={ user() ? <Layout/> : <Navigate to={'/auth/sign-in'}/> }>
                    <Route index element={ <HomePage/> }/>
                </Route>
                <Route path='auth' element={ <AuthLayout/> }>
                    <Route path='sign-in' element={ <SignInPage/> }/>
                    <Route path='sign-up' element={ <SignUpPage/> }/>
                    <Route path="change-password" element={ <ChangePasswordPage/> }/>
                    <Route index element={ <Navigate to={'/auth/sign-in'}/> }/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
