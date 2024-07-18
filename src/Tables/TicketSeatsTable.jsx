import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import TicketService from '../Services/TicketService';

const TicketSeatsTable = ({ application, handleSubmit }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => { 
            const ticketsResponse = await TicketService.getByApplication(application.id);
            setTickets(ticketsResponse.data);
        }

        fetchTickets().catch(console.error);
    }, [application]);

    const addRows = () => {
        return application.seats.map(e => createRow(e));
    }
 
    const createRow = seat => {
        let ticket, ticketStatus = 'unoccupied';
        ticket = tickets.find(el => el.seat.id === seat.id);
        
        if (ticket) {
            ticketStatus = ticket.is_sold ? 'sold' : 'occupied';
        }

        return (
            <tr key={ seat.id }>
                <td>{ seat.number }</td> 
                <td>{ seat.row }</td> 
                <td>{ seat.sector }</td> 
                <td>{ ticketStatus }</td>
                <td>
                    <input id={ seat.id }
                        className="form-check-input" 
                        onChange={ handleSeatChange }
                        type="checkbox" 
                        disabled={ ticketStatus !== 'unoccupied' }
                    />
                </td>
            </tr>
        )
    }

    const handleSeatChange = e => {
        const selectedId = parseInt(e.target.id);

        if (e.target.checked) {
            const selectedSeat = application.seats.find(el => el.id === selectedId);
            setSelectedSeats([...selectedSeats, selectedSeat]);
            return;
        }

        setSelectedSeats(selectedSeats.filter(el => el.id !== selectedId));
    }

    return (
        <div className='my-4 px-4'>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Row</th>
                        <th>Sector</th>
                        <th>Status</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {addRows()}
                </tbody>
            </Table>
            <div className="d-flex justify-content-center">
                <button type="button" 
                    className="btn btn-primary w-2" 
                    onClick={ e => handleSubmit(selectedSeats) }
                >
                    <i className="bi bi-cart-plus"> </i>Add to cart
                </button>
            </div>
        </div>
    )
}

export default TicketSeatsTable;