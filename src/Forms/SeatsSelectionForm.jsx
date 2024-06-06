import { useEffect, useState, useContext } from "react";
import SeatService from "../Services/SeatService";
import AuthContext from '../Context/AuthContext';

const SeatsSelectionForm = ({ hallId, handleClose, submitSelection, initialSeats }) => {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const seatsResponse = await SeatService.getByHall(hallId);
            setSeats(seatsResponse.data);
        } 

        if (hallId) {
            fetchData().catch(console.error);
            setSelectedSeats([...initialSeats, ...selectedSeats]);
        }
    }, [hallId]);

    const makeTitle = seat => {
        return `info\nnumber: ${seat.number} row: ${seat.row} sector: ${seat.sector}`;
    }

    const makeSelection = () => {
        return seats.map(el => {
            return <div key={ el.id } className="flex-row align-items-center my-3">
                <label className="form-check-label mx-3" htmlFor={ el.id }>{ el.number }</label>
                <input title={ makeTitle(el) } 
                    disabled={ user().role.permission_application !== 'editable' }
                    checked={ selectedSeats.map(seat => seat.id).includes(el.id) }
                    id={ el.id }
                    className="form-check-input" 
                    onChange={ handleSeatChange }
                    type="checkbox" 
                />
            </div>});
    }

    const handleSeatChange = e => {
        const selectedId = parseInt(e.target.id);

        if (e.target.checked) {
            const selectedSeat = seats.find(el => el.id === selectedId);
            setSelectedSeats([...selectedSeats, selectedSeat]);
            return;
        }

        setSelectedSeats(selectedSeats.filter(el => el.id !== selectedId));
    }

    const handleSubmit = async event => {
        event.preventDefault();
        submitSelection(selectedSeats);
        handleClose();
    }

    return (
        <div className="my-3">
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-center form-group">
                    { makeSelection() }
                    { user().role.permission_application === 'editable' ?
                    <button type="submit" className="btn btn-primary mt-3">
                        Submit
                    </button>
                    : null}
                </div>
            </form>
        </div>
    )
}

export default SeatsSelectionForm;