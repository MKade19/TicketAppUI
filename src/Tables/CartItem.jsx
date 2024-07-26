import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import Util from '../Util/Util';
import TicketService from '../Services/TicketService';
import DialogMessages from '../Util/DialogMessages';
import { useEffect, useState } from 'react';


const CartItem = ({ ticket, fetchData }) => {
    const navigate = useNavigate();
    const [timeToExpire, setTimeToExpire] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const timeToExpire = Util.getTimeToExpire(ticket.created_date, 20);

            if (timeToExpire <= 0) {
                TicketService.deleteById(ticket.id).catch(console.error);
                fetchData();
                DialogMessages.warningMessage('One of your tickets has expired and has been removed.');
                return null;
            }

            const minutes = new Date(timeToExpire).getMinutes();
            const seconds = new Date(timeToExpire).getSeconds();

            setTimeToExpire(`${minutes} min ${seconds} sec`);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

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

    return (
        <Card className='mx-3 my-3'>
            <Card.Body>
                <Card.Img className='mb-3' style={{ width: '17vw', height: '20vh' }} variant="top" src={ 
                    `http://127.0.0.1:8000/${
                        ticket.application.event.images.length === 0 ? 
                        'media/images/placeholder-image.png' :
                        ticket.application.event.images[0].image_url
                    }` 
                } />
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
                    <div>Time to expire: { timeToExpire }</div>
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