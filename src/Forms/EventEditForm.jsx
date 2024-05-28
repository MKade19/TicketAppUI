import { useEffect, useState, useContext } from "react";
import DialogMessages from "../Util/DialogMessages";
import HallService from "../Services/HallService";
import EventService from "../Services/EventService";
import AuthContext from '../Context/AuthContext';

const EventEditForm = ({ eventId, handleClose, fetchData }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [price, setPrice] = useState(0.0);
    const [activeHall, setActiveHall] = useState({});
    const [halls, setHalls] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const hallsResponse = await HallService.getAll();
            setHalls(hallsResponse.data);
            setActiveHall(hallsResponse.data[0]);

            if (eventId) {
                const eventResponse = await EventService.getById(eventId);
                setName(eventResponse.data.name);
                setDate(eventResponse.data.date.split('T')[0]);
                setStart(eventResponse.data.start);
                setEnd(eventResponse.data.end);
                setPrice(eventResponse.data.price);
                setActiveHall(eventResponse.data.hall);
            }
        } 

        fetchData().catch(console.error);
    }, [eventId]);

    const changeName = event => {
        setName(event.target.value);
    }

    const changeDate = event => {
        setDate(event.target.value);
    }

    const changeStart = event => {
        setStart(event.target.value);
    }

    const changeEnd = event => {
        setEnd(event.target.value);
    }

    const changePrice = event => {
        setPrice(event.target.value);
    }

    const changeActiveHall = event => {
        setActiveHall(halls.filter(e => e.name === event.target.value)[0]);
    }

    const addHallOptions = () => {
        return halls.map(e => <option key={e.id}>{e.name}</option>);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let response;

        try {
            if (eventId) {
                response = await EventService.updateOne({ 
                    id: eventId, 
                    name, 
                    date, 
                    start, 
                    end,
                    price,
                    hall: activeHall.id,
                    administrator: user().id
                } );
                DialogMessages.successMessage("Event has been updated");
            }
            else {
                response = await EventService.createOne({ name, date, start, end, price, hall: activeHall.id, administrator: user().id });
                DialogMessages.successMessage("Event has been created");
            }

            fetchData();
            handleClose();
        } catch (error) {
            console.log(error);
            DialogMessages.errorMessage("Validation error!");
        }
    }

    return (
        <div className="my-3">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="nameInput">Name</label>
                        <input className="form-control" required type="text" id="nameInput" placeholder="Enter name" value={name} onChange={changeName}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="dateInput">Date</label>
                        <input type="date" className="form-control" required id="dateInput" value={date} onChange={changeDate}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="startInput">Start</label>
                        <input type="time" className="form-control" required id="startInput" value={start} onChange={changeStart}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="endInput">End</label>
                        <input type="time" className="form-control" required id="endInput" value={end} onChange={changeEnd}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="priceInput">Price</label>
                        <input type="number" className="form-control" required id="priceInput" value={price} onChange={changePrice}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="hallSelect">Hall</label>
                        <select className="form-select" 
                            id="hallSelect"
                            value={ activeHall.name } 
                            onChange={changeActiveHall} 
                            placeholder="Choose hall">
                            {addHallOptions()}
                        </select>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EventEditForm;