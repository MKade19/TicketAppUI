import { useContext, useState, useEffect } from "react"
import AuthContext from "../Context/AuthContext";
import RoleService from '../Services/RoleService';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [roles, setRoles] = useState([]);
    const [activeRole, setActiveRole] = useState({});

    const { registerUser } = useContext(AuthContext);

    const changeEmail = event => {
        setEmail(event.target.value);
    }

    const changeFullname = event => {
        setFullname(event.target.value);
    }

    const changePassword = event => {
        setPassword(event.target.value);
    }

    const changeConfirmPassword = event => {
        setConfirmPassword(event.target.value);
    }

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

    const handleSubmit = async event => {
        event.preventDefault();
        await registerUser(email, fullname, password, confirmPassword, activeRole.id);
    }

    return (
        <div className="my-3 d-flex flex-column justify-content-center align-items-center">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="my-3" htmlFor="emailInput">Email</label>
                        <input className="form-control" type="email" id="emailInput" value={email} onChange={changeEmail} placeholder="Enter email"/>
                        <label className="my-3" htmlFor="fullnameInput">Fullname</label>
                        <input className="form-control" type="text" id="fullnameInput" value={fullname} onChange={changeFullname} placeholder="Enter fullname"/>
                        <label className="my-3" htmlFor="passwordInput">Password</label>
                        <input className="form-control" type="password" id="passwordInput" value={password} onChange={changePassword} placeholder="Password"/>
                        <label className="my-3" htmlFor="confirmPasswordInput">Confirm password</label>
                        <input 
                            className="form-control" 
                            type="password" 
                            id="confirmPasswordInput" 
                            value={confirmPassword} 
                            onChange={changeConfirmPassword} 
                            placeholder="Confirm password"
                            />
                        <div className="flex-row align-items-center my-3">
                            <label className="mx-3" htmlFor="roleSelect">Role</label>
                            <select className="form-select" 
                                id="roleSelect"
                                value={ activeRole.name } 
                                onChange={changeActiveRole} 
                                placeholder="Choose role">
                                {addRolesOptions()}
                            </select>
                            { activeRole.id === 1 ? null : 
                                <p className="text-danger mt-2">
                                    Warning! Role that you have selected<br/>
                                    requires the approval of administrator.
                                </p> }
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary mt-4"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default SignUpForm;