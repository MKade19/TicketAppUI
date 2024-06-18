import { LinkContainer } from "react-router-bootstrap";
import SignInForm from "../Forms/SignInForm";
import SignInGoolgleForm from "../Forms/SignInGoogleForm";

const SignInPage = () => {
    return (
        <>
            <h1 className="my-4">Sign in</h1>
            <SignInForm/>
            <SignInGoolgleForm/>
            <div className="d-flex align-items-center justify-content-center">
                <LinkContainer to={'/auth/change-password'}>
                    <button className="btn btn-link">Change password</button>
                </LinkContainer>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                Have not registered yet?
                <LinkContainer to={'/auth/sign-up'}>
                    <button  className="btn btn-link">Sign up</button>
                </LinkContainer>
                <LinkContainer to={'/auth/sign-up-google'}>
                    <button  className="btn btn-link">Sign up with Google</button>
                </LinkContainer>                
            </div>
        </>
    );
}

export default SignInPage;
