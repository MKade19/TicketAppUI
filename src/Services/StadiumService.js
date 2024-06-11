import axios from "../axios/axios";

class StadiumService {
    getAll = async () => {
        return await axios.get('stadiums/');
    }

    getById = async id => {
        return await axios.get(`stadiums/${id}/`);
    }

    getByAdmin = async adminId => {
        return await axios.get(`stadiums/admin/?id=${adminId}`);
    }

    getApplicationsByStadiumAdmin = async adminId => {
        return await axios.get(`stadiums/admin_applications/?adminId=${adminId}`);
    }

    createOne = async ({ name, image, description, city, administrator }) => {
        const body = { name, image, description, city, administrator };
        return await axios.post('stadiums/', body);
    }

    updateOne = async ({ id, name, image, description, city, administrator }) => {
        const body = { name, image, description, city, administrator }
        return await axios.put(`stadiums/${id}/`, body);
    }

    deleteById = async id => {
        return await axios.delete(`stadiums/${id}/`);
    }
}

const stadiumService = new StadiumService();
export default stadiumService;