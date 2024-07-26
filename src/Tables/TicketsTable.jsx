import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import TicketService from '../Services/TicketService';
import DialogMessages from '../Util/DialogMessages';
import { useNavigate } from 'react-router-dom';

const TicketsTable = ({ tickets, fetchData }) => {
    const navigate = useNavigate();

    const addRows = () => {
        return tickets.map(t => createRow(t));
    }
 
    const createRow = ticket => {
        return (
            <tr key={ ticket.id }>
                <td>{ ticket.application.event.name }</td>
                <td>{ ticket.application.event.date }</td>
                <td>{ ticket.application.event.start }</td>
                <td>{ ticket.application.event.end }</td>
                <td>{ ticket.application.event.price }</td>
                <td>{ ticket.seat.number }</td> 
                <td>{ ticket.seat.row }</td> 
                <td>{ ticket.seat.sector }</td> 
                <td>
                    <button className='btn btn-outline-primary' onClick={ e => { goToEvent(ticket.application.event.id, e) } }>
                        <i className="bi bi-arrow-bar-up"> </i>
                    </button> 
                </td>
                <td>
                    <button className='btn btn-outline-danger' onClick={ e => { deleteTicket(ticket.id, e) } }>
                        <i className="bi bi-trash"></i>
                    </button> 
                </td>
            </tr>
        )
    }

    const goToEvent = eventId => {
        navigate(`/events/${eventId}`);
    }

    const deleteTicket = (ticketId, e) => {
        DialogMessages.confirmMessage('Are you sure, to delete the ticket?')
        .then(async result => {
            if (result.isConfirmed) {
                DialogMessages.successMessage("Ticket has been deleted");
                await TicketService.deleteById(ticketId);
                await fetchData();
            } else if (result.isDenied) {
                return;
            }
        })
    }

    return (
        <div className='my-4 px-4'>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Price</th>
                        <th>Number</th>
                        <th>Row</th>
                        <th>Sector</th>
                        <th>To event</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {addRows()}
                </tbody>
            </Table>
        </div>
    )
}

export default TicketsTable;