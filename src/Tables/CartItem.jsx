import Card from 'react-bootstrap/Card';
import Util from '../Util/Util';

const CartItem = ({ ticket }) => {
    return (
        <Card className='mx-3 my-3'>
            <Card.Body>
                <Card.Title>{ ticket.application.event.name }</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{ticket.application.event.hall.stadium.city.name}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{ticket.application.event.hall.stadium.name + ' stadium'}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{ticket.application.event.hall.name + ' hall'}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">Seat: { ticket.seat.number }, Row: { ticket.seat.row }, Sector: { ticket.seat.sector }</Card.Subtitle>
                <div className='d-flex flex-column justify-content-center'>
                    <div>Date: { ticket.application.event.date }</div>
                    <div>Start: { ticket.application.event.start }</div>
                    <div>End: { ticket.application.event.end }</div>
                    <div>Price: { ticket.application.event.price }</div>
                    <div>Expires in: { Util.addMinutes(new Date(ticket.created_date), 20).toISOString() }</div>
                </div>
                <div className='mt-3 d-flex justify-content-around'>
                    <button className='btn btn-outline-primary mx-3'>
                        <i className="bi bi-arrow-bar-up"> </i>Go to event
                    </button>
                    <button className='btn btn-outline-danger'>
                        <i className="bi bi-trash"></i>Delete ticket
                    </button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CartItem;