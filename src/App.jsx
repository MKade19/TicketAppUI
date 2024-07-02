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
import SignUpGooglePage from './Pages/SignUpGooglePage';
import ProfilePage from './Pages/ProfilePage';
import ChatWidget from './Forms/ChatWidget';


const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={ user() ? <Layout/> : <Navigate to={'/auth/sign-in'}/> }>
                    <Route index element={ <HomePage/> }/>
                    <Route path='profile' element={ <ProfilePage/> }/>
                </Route>
                <Route path='auth' element={ <AuthLayout/> }>
                    <Route path='sign-in' element={ <SignInPage/> }/>
                    <Route path='sign-up' element={ <SignUpPage/> }/>
                    <Route path='sign-up-google' element={ <SignUpGooglePage/> }/>
                    <Route path="change-password" element={ <ChangePasswordPage/> }/>
                    <Route index element={ <Navigate to={'/auth/sign-in'}/> }/>
                </Route>
            </Routes>
            { user() ? <ChatWidget /> : null }
        </div>
    );
}

export default App;
