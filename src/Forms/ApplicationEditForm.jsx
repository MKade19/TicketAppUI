import { useEffect, useState, useContext } from "react";
import DialogMessages from "../Util/DialogMessages";
import ApplicationService from "../Services/ApplicationService";
import StadiumService from "../Services/StadiumService";
import HallService from "../Services/HallService";
import AuthContext from '../Context/AuthContext';

const ApplicationEditForm = ({ applicationId, eventId, handleClose, fetchData }) => {
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

            if (applicationId) {
                const applicationResponse = await ApplicationService.getById(applicationId);
                setDate(applicationResponse.data.date.split('T')[0]);
                setStart(applicationResponse.data.start);
                setEnd(applicationResponse.data.end);
            }
        } 

        fetchData().catch(console.error);
    }, [applicationId]);

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

    const changeDate = event => {
        setDate(event.target.value);
    }

    const changeStart = event => {
        setStart(event.target.value);
    }

    const changeEnd = event => {
        setEnd(event.target.value);
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
            if (applicationId) {
                response = await ApplicationService.updateOne({ 
                    id: applicationId, 
                    date, 
                    start, 
                    end, 
                    event: eventId
                } );
                DialogMessages.successMessage("Application has been updated");
            }
            else {
                response = await ApplicationService.createOne({ date, start, end, event: eventId });
                DialogMessages.successMessage("Application has been created");
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
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-outline-primary mt-4">
                            <i className="bi bi-chevron-expand"></i> Choose seats
                        </button>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ApplicationEditForm;