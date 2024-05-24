import AuthContext from "../Context/AuthContext";
import { useState, useContext } from "react";

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser } = useContext(AuthContext);

    const changeEmail = event => {
        setEmail(event.target.value);
    }

    const changePassword = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        await loginUser(email, password);
    }

    return (
        <div className="my-3 d-flex flex-column justify-content-center align-items-center">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="my-3" htmlFor="emailInput">Email</label>
                        <input className="form-control" required type="email" id="emailInput" value={email} onChange={changeEmail} placeholder="Enter email"/>
                        <label className="my-3" htmlFor="passwordInput">Password</label>
                        <input className="form-control" required type="password" id="passwordInput" value={password} onChange={changePassword} placeholder="Password"/>
                        <button
                            type="submit"
                            className="btn btn-primary mt-4"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default SignInForm;