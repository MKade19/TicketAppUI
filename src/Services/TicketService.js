import axios from "../axios/axios";

class TicketService {
    createOne = async ({ application, seat, customer }) => {
        const body = { application, seat, customer };
        return await axios.post('tickets/', body);
    }
}

const ticketService = new TicketService();
export default ticketService;