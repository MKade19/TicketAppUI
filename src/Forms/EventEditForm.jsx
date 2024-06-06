import { useEffect, useState, useContext } from "react";
import DialogMessages from "../Util/DialogMessages";
import EventService from "../Services/EventService";
import AuthContext from '../Context/AuthContext';
import StadiumService from "../Services/StadiumService";
import HallService from "../Services/HallService";

const EventEditForm = ({ eventId, handleClose, fetchData }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0.0);
    const [date, setDate] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [stadiums, setStadiums] = useState([]);
    const [activeStadium, setActiveStadium] = useState({});
    const [halls, setHalls] = useState([]);
    const [activeHall, setActiveHall] = useState({});
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const stadiumResponse = await StadiumService.getAll();
            setStadiums(stadiumResponse.data);
            setActiveStadium(stadiumResponse.data[0]);

            if (eventId) {
                const eventResponse = await EventService.getById(eventId);
                setName(eventResponse.data.name);
                setDate(eventResponse.data.date.split('T')[0]);
                setStart(eventResponse.data.start);
                setEnd(eventResponse.data.end);
                setPrice(eventResponse.data.price);
            }
        } 

        fetchData().catch(console.error);
    }, [eventId]);

    useEffect(() => {
        const fetchHalls = async () => {
            const hallsResponse = await HallService.getByStadium(activeStadium.id);
            setHalls(hallsResponse.data);
            setActiveHall(hallsResponse.data[0]);
        }

        if (activeStadium.id) {
            fetchHalls().catch(console.error);
        }
    }, [activeStadium]);

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

    const changeActiveStadium = event => {
        setActiveStadium(stadiums.filter(e => e.name === event.target.value)[0]);
    }

    const changeActiveHall = event => {
        setActiveHall(halls.filter(e => e.name === event.target.value)[0]);
    }

    const addStadiumsOptions = () => {
        return stadiums.map(e => <option key={e.id}>{e.name}</option>);
    }

    const addHallsOptions = () => {
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
                    administrator: user().id 
                });
                DialogMessages.successMessage("Event has been updated");
            }
            else {
                response = await EventService.createOne({ 
                    name, 
                    date, 
                    start, 
                    end, 
                    price, 
                    administrator: user().id 
                });
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
                        <label className="mx-3" htmlFor="stadiumSelect">Stadium</label>
                        <select className="form-select" 
                            id="stadiumSelect"
                            value={ activeStadium.name } 
                            onChange={changeActiveStadium} 
                            placeholder="Choose stadium">
                            {addStadiumsOptions()}
                        </select>
                    </div>{ activeStadium.id ? 
                        <div className="flex-row align-items-center my-3">
                            <label className="mx-3" htmlFor="hallSelect">Hall</label>
                            <select className="form-select" 
                                id="hallSelect"
                                value={ activeHall.name } 
                                onChange={changeActiveHall} 
                                placeholder="Choose hall">
                                {addHallsOptions()}
                            </select>
                        </div>
                        : null}  
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EventEditForm;