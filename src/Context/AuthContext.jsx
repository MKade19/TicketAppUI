import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthService from "../Services/AuthService";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const authTokens = () => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
    const user = () => localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    const navigate = useNavigate();

    const loginUser = async (email, password) => {
        const response = await AuthService.login(email, password);
        const data = response.data;

        if(response.status === 200){
            const tokens = {
                access: data.access, 
                refresh: data.refresh
            }

            localStorage.setItem("authTokens", JSON.stringify(tokens));
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/")
            Swal.fire({
                title: "You are logged in",
                icon: "success",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });

        } else {    
            Swal.fire({
                title: "Email does not exist or Incorrect Password. Please contact to administrator",
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }

    const registerUser = async (email, fullname, password, confirmPassword, role) => {
        const response = await AuthService.register({ email, fullname, password, confirmPassword, role });

        const data = await response.data;
        console.log(data);

        if(response.status === 201){
            navigate("/auth/sign-in");
            Swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 1000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            Swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 1000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const logoutUser = () => {
        localStorage.removeItem("authTokens");
        localStorage.removeItem("user");
        navigate("/auth/sign-in");
        Swal.fire({
            title: "You are logged out",
            icon: "success",
            toast: true,
            timer: 3000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    const contextData = {
        user, 
        authTokens,
        loginUser,
        registerUser,
        logoutUser,
    }

    return (
        <AuthContext.Provider value={ contextData }>
            { children }
        </AuthContext.Provider>
    )
}