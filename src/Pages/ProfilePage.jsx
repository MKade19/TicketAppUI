import { useState, useEffect, useContext } from "react";
import EventService from "../Services/EventService";
import EventEditModal from "../Modals/EventEditModal";
import EventsTable from "../Tables/EventsTable";
import AuthContext from '../Context/AuthContext';
import ApplicationsViewModal from "../Modals/ApplicationsViewModal";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    const [editFormOpened, setEditFormOpened] = useState(false);
    const [applicationsViewOpened, setApplicationsViewOpened] = useState(false);
    const [eventId, setEventId] = useState(null);
    const [events, setEvents] = useState([]);

    const handleOpenForm = (id, event) => {
        setEventId(id);
        setEditFormOpened(true);
    }
    
    const handleCloseForm = event => {
        setEditFormOpened(false);
    }

    const handleOpenApplicationsView = (id, event) => {
        setEventId(id);
        setApplicationsViewOpened(true);
    }

    const handleCloseApplicationsView = event => {
        setApplicationsViewOpened(false);
    }
    
    const fetchData = async () => {
        const eventsData = await EventService.getByAdmin(user().id);
        setEvents(eventsData.data);   
    }

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);

    return (
        <>
            <h2 className="mb-4">{ user().fullname } events</h2>
            {/* {user().userRole.permission_appointment === 'editable' ?  */}
                <div>
                    <button onClick={ event => { handleOpenForm(null, event) } } className="btn btn-outline-primary">
                        <div className="bi bi-plus-circle"> Create new</div>
                    </button>
                </div> 
                {/* : null }  */}
            <EventsTable 
                events={ events }
                handleOpenForm={ handleOpenForm } 
                fetchData={ fetchData }
                handleOpenApplicationsView={ handleOpenApplicationsView }
            />
            <EventEditModal 
                eventId={ eventId }
                showModal={ editFormOpened } 
                handleClose={ handleCloseForm }
                fetchData={ fetchData }
            />
            <ApplicationsViewModal
                eventId={ eventId }
                showModal={ applicationsViewOpened } 
                handleClose={ handleCloseApplicationsView }
            />
        </>
    );
}

export default ProfilePage;