import { useContext, useState, useEffect } from "react"
import AuthContext from "../Context/AuthContext";
import RoleService from '../Services/RoleService';
import {useGoogleLogin} from '@react-oauth/google';

const SignUpGoogleForm = () => {

    const { signUpGoogleUser } = useContext(AuthContext);
    const [roles, setRoles] = useState([]);
    const [activeRole, setActiveRole] = useState({});

    const changeActiveRole = event => {
        setActiveRole(roles.filter(e => e.name === event.target.value)[0]);
    }

    useEffect(() => {
        const fetchData = async () => {
            const roleResponse = await RoleService.getAll();
            setRoles(roleResponse.data);
            setActiveRole(roleResponse.data[0]);
        }

        fetchData();
    }, []);

    const addRolesOptions = () => {
        return roles.map(e => <option key={e.id}>{e.name}</option>);
    }

    const signUpGoogle = useGoogleLogin({
        onSuccess: async tokenResponse => { await signUpGoogleUser(tokenResponse.access_token, activeRole.id)},
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
        <div className="my-3 d-flex flex-column justify-content-center align-items-center">
            <div>
                   <div className="form-group">
                        <div className="flex-row align-items-center my-3">
                            <label className="mx-3" htmlFor="roleSelect">Role</label>
                            <select className="form-select" 
                                id="roleSelect"
                                value={ activeRole.name } 
                                onChange={changeActiveRole} 
                                placeholder="Choose role">
                                {addRolesOptions()}
                            </select>
                            { !activeRole ? '' : activeRole.id === 2 ? null : 
                                <p className="text-danger mt-2">
                                    Warning! Role that you have selected<br/>
                                    requires the approval of administrator.
                                </p> }
                        </div><button className="btn btn-primary mt-4" onClick={signUpGoogle}>Sign up with Google 🚀 </button>
                    </div>
            </div>
        </div>
    )
}

export default SignUpGoogleForm;