import Table from 'react-bootstrap/Table';
import { useState } from 'react';

const TicketSeatsTable = ({ application, handleSubmit }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const addRows = () => {
        return application.seats.map(e => createRow(e));
    }
 
    const createRow = seat => {
        return (
            <tr key={seat.id}>
                <td>{seat.number}</td> 
                <td>{seat.row}</td> 
                <td>{seat.sector}</td> 
                <td></td>
                <td>
                    <input id={ seat.id }
                        className="form-check-input" 
                        onChange={ handleSeatChange }
                        type="checkbox" 
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
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default TicketSeatsTable;