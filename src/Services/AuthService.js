import axios from "axios";

class AuthService {
    login = async (email, password) => {
        try {
            const body = { email, password };
            return await axios.post('http://127.0.0.1:8000/ticket-app/api/auth/token/', body);
        } catch (error) {
            return error.response;
        }
    }

    loginGoogle = async (access_token) => {
        try {
            const body = { access_token:  access_token};
            return await axios.post('http://localhost:8000/ticket-app/api/auth/google/', body);
        } catch (error) {
            return error.response;
        }
    }

    getGoogleUserInfo = async (access_token) => {
        try {
            return await axios.get(`http://localhost:8000/ticket-app/api/auth/google/?access_token=${access_token}`);
        } catch (error) {
            return error.response;
        }
    }

    signupGoogle = async ({ email, role }) => {
        try {
            const body = { email, role};
            return await axios.post('http://localhost:8000/ticket-app/api/auth/google-signup/', body);
        } catch (error) {
            return error.response;
        }
    }    

    register = async ({ email, fullname, password, confirmPassword, role }) => {
        try {
            const body = { email, fullname, password, confirmPassword, role };
            return await axios.post("http://127.0.0.1:8000/ticket-app/api/auth/register/", body);
        } catch (error) {
            return error.response;
        }
    }

    changePassword = async (email, oldPassword, newPassword, confirmPassword) => {
        try {
            const body = { email, oldPassword, newPassword, confirmPassword };
            return await axios.post("http://127.0.0.1:8000/ticket-app/api/auth/change-password/", body);
        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    }
}

const authService = new AuthService();
export default authService;