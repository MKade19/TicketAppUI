import { LinkContainer } from "react-router-bootstrap";
import SignUpGoogleForm from "../Forms/SignUpGoogleForm";

const SignUpGooglePage = () => {
    return (
        <>
            <h1 className="my-4">Sign up with Google</h1>
            <SignUpGoogleForm/>
            <LinkContainer to={'/auth/sign-in'}>
                <button className="btn btn-link">Back to sign in</button>
            </LinkContainer>
        </>
    );
}

export default SignUpGooglePage;