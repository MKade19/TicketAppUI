import axios from "../axios/axios";

class TicketService {
    getByApplication = async apppicationId => {
        return await axios.get(`tickets/application/?id=${apppicationId}`);
    }

    getForCustomerByStatus = async (customerId, status) => {
        return await axios.get(`tickets/customer/?id=${customerId}&status=${status ? 'True' : 'False'}`);
    }

    createOne = async ({ application, seat, customer }) => {
        const body = { application, seat, customer };
        return await axios.post('tickets/', body);
    }

    deleteById = async id => {
        return await axios.delete(`tickets/${id}/`);
    }
}

const ticketService = new TicketService();
export default ticketService;