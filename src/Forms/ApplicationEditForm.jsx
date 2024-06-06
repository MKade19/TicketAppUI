import { useEffect, useState, useContext } from "react";
import DialogMessages from "../Util/DialogMessages";
import ApplicationService from "../Services/ApplicationService";
import EventService from "../Services/EventService";
import SeatsSelectionModal from "../Modals/SeatsSelectionModal";
import AuthContext from '../Context/AuthContext';


const ApplicationEditForm = ({ applicationId, eventId, handleClose, fetchData }) => {
    const [event, setEvent] = useState({});
    const [seats, setSeats] = useState([]);
    const [selectionFormOpened, setSelectionFormOpened] = useState(false);

    const { user } = useContext(AuthContext);

    const handleOpenSeatSelection = event => {
        setSelectionFormOpened(true);
    }
    
    const handleCloseSeatSelection = event => {
        setSelectionFormOpened(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (applicationId) {
                const applicationResponse = await ApplicationService.getById(applicationId);
                setSeats(applicationResponse.data.seats);
                setEvent(applicationResponse.data.event);
            }

            if (eventId) {
                const eventResponse = await EventService.getById(eventId);
                setEvent(eventResponse.data);
            }
        } 

        fetchData().catch(console.error);
    }, [applicationId]);

    const submitSelection = selectedSeats => {
        setSeats(selectedSeats);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let response;

        try {
            if (applicationId) {
                response = await ApplicationService.updateOne({ 
                    id: applicationId, 
                    event: eventId,
                    seats: seats.map(el => el.id)
                } );
                DialogMessages.successMessage("Application has been updated");
            }
            else {
                response = await ApplicationService.createOne({ 
                    event: eventId, 
                    seats: seats.map(el => el.id)
                });
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
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        Seats selected { seats.length }
                        <button onClick={ handleOpenSeatSelection } type="button" className="btn btn-outline-primary mx-3">
                            <i className="bi bi-chevron-expand"></i> 
                            { user().role.permission_application === 'editable' ? ' Choose ' : ' View ' } 
                            seats
                        </button>
                    </div>
                    { user().role.permission_application === 'editable' ?
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </div>
                    : null }
                </div>
            </form>
            <SeatsSelectionModal hallId={ event ? event.hall : false }
                handleClose={ handleCloseSeatSelection }
                showModal={ selectionFormOpened }
                submitSelection={ submitSelection }
                initialSeats={ seats }
            />
        </div>
    )
}

export default ApplicationEditForm;