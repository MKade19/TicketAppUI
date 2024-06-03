import axios from "../axios/axios";

class ApplicationService {
    getAll = async () => {
        return await axios.get('applications/');
    }

    getById = async id => {
        return await axios.get(`applications/${id}/`);
    }

    getByEvent = async eventId => {
        return await axios.get(`applications/event/?id=${eventId}`);
    }

    createOne = async ({ date, start, end, event, seats }) => {
        const body = { date, start, end, event, seats };
        return await axios.post('applications/', body);
    }

    updateOne = async ({ id, date, start, end, event, seats }) => {
        const body = { date, start, end, event, seats };
        return await axios.put(`applications/${id}/`, body);
    }

    deleteById = async id => {
        return await axios.delete(`applications/${id}/`);
    }
}

const applicationService = new ApplicationService();
export default applicationService;