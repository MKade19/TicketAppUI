import axios from "../axios/axios";

class HallService {
    getAll = async () => {
        return await axios.get('halls/');
    }

    getById = async id => {
        return await axios.get(`halls/${id}/`);
    }

    createOne = async ({ name, stadium }) => {
        const body = { name, stadium };
        return await axios.post('halls/', body);
    }

    updateOne = async ({ id, name, stadium }) => {
        const body = { name, stadium }
        return await axios.put(`halls/${id}/`, body);
    }

    deleteById = async id => {
        return await axios.delete(`halls/${id}/`);
    }
}

const hallService = new HallService();
export default hallService;