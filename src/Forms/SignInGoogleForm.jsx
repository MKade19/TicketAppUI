import AuthContext from "../Context/AuthContext";
import {useContext } from "react";
import {useGoogleLogin} from '@react-oauth/google';

const SignInGoogleForm = () => {

    const { loginGoogleUser } = useContext(AuthContext);

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => { await loginGoogleUser(tokenResponse.access_token)},
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <button className="btn btn-primary mt-4" onClick={login}>Sign in with Google 🚀 </button>
    )
}

export default SignInGoogleForm;