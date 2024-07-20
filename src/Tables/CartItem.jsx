import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Util from '../Util/Util';
import TicketService from '../Services/TicketService';
import DialogMessages from '../Util/DialogMessages';


const CartItem = ({ ticket, fetchData }) => {
    const navigate = useNavigate();

    const removeTicket = async () => {
        DialogMessages.confirmMessage('Do you want to remove this ticket?').then(async result => {
            if (result.isConfirmed) {
                DialogMessages.successMessage("Ticket has been removed");
                await TicketService.deleteById(ticket.id);
                await fetchData();
            } else if (result.isDenied) {
                return;
            }
        })
    }

    const goToEvent = () => {
        navigate(`/events/${ticket.application.event.id}`);
    }

    const makeExpiringTime = () => {
        const timeToExpire = Util.getTimeToExpire(ticket.created_date, 20);

        if (timeToExpire <= 0) {
            TicketService.deleteById(ticket.id).catch(console.error);
            fetchData();
            return null;
        }

        const minutes = new Date(timeToExpire).getMinutes();
        const seconds = new Date(timeToExpire).getSeconds();

        return `${minutes} min ${seconds} sec`;
    }

    return (
        <Card className='mx-3 my-3'>
            <Card.Body>
                <Card.Title>{ ticket.application.event.name }</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ ticket.application.event.hall.stadium.city.name }</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{ ticket.application.event.hall.stadium.name + ' stadium' }</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{ ticket.application.event.hall.name + ' hall' }</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Seat: { ticket.seat.number }, Row: { ticket.seat.row }, Sector: { ticket.seat.sector }</Card.Subtitle>
                <div className='d-flex flex-column justify-content-center'>
                    <div>Date: { ticket.application.event.date }</div>
                    <div>Start: { ticket.application.event.start }</div>
                    <div>End: { ticket.application.event.end }</div>
                    <div>Price: { ticket.application.event.price }</div>
                    <div>Time to expire: { makeExpiringTime() }</div>
                </div>
                <div className='mt-3 d-flex justify-content-around'>
                    <button className='btn btn-outline-primary mx-3' onClick={ goToEvent }>
                        <i className="bi bi-arrow-bar-up"> </i>Go to event
                    </button>
                    <button className='btn btn-outline-danger' onClick={ removeTicket }>
                        <i className="bi bi-trash"></i>Remove ticket
                    </button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CartItem;