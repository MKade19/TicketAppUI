import axios from "../axios/axios";

class SeatService {
    getAll = async () => {
        return await axios.get('seats/');
    }

    getById = async id => {
        return await axios.get(`seats/${id}/`);
    }

    getByHall = async hallId => {
        return await axios.get(`seats/hall/?id=${hallId}`);
    }

    createOne = async ({ number, row, sector, hall }) => {
        const body = { number, row, sector, hall };
        return await axios.post('seats/', body);
    }

    updateOne = async ({ id, number, row, sector, hall }) => {
        const body = { number, row, sector, hall }
        return await axios.put(`seats/${id}/`, body);
    }

    deleteById = async id => {
        return await axios.delete(`seats/${id}/`);
    }
}

const seatService = new SeatService();
export default seatService;