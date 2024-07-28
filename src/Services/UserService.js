import axios from "../axios/axios";

class UserService {
    getAll = async () => {
        return await axios.get('users/');
    }

    getById = async id => {
        return await axios.get(`users/${id}/`);
    }

}

const userService = new UserService();
export default userService;