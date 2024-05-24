import { LinkContainer } from "react-router-bootstrap";
import SignUpForm from "../Forms/SignUpForm";

const SignUpPage = () => {
    return (
        <>
            <h1 className="my-4">Sign up</h1>
            <SignUpForm/>
            <LinkContainer to={'/auth/sign-in'}>
                <button className="btn btn-link">Back to sign in</button>
            </LinkContainer>
        </>
    );
}

export default SignUpPage;