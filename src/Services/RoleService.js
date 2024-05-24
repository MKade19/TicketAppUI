import axios from "../axios/axios";

class RoleService {
    getAll = async () => {
        return await axios.get('roles/');
    }
}

const roleService = new RoleService();
export default roleService;