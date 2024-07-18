import axios from "../axios/axios";

class TicketService {
    createOne = async ({ application, seat, customer }) => {
        const body = { application, seat, customer };
        return await axios.post('tickets/', body);
    }

    getByApplication = async apppicationId => {
        return await axios.get(`tickets/application/?id=${apppicationId}`);
    }

    getForCustomerByStatus = async (customerId, status) => {
        return await axios.get(`tickets/customer/?id=${customerId}&status=${status ? 'True' : 'False'}`);
    }
}

const ticketService = new TicketService();
export default ticketService;