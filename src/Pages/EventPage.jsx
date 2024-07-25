import { useEffect, useState } from "react";
import EventService from '../Services/EventService';
import { useNavigate, useParams } from "react-router-dom";
import SeatsTicketSelectionModal from "../Modals/SeatsTicketSelectionModal";

const EventPage = () => {
    const [currentEvent, setCurrentEvent] = useState({});
    const [seatsSelectionOpened, setSeatsSelectionOpened] = useState(false);
    const [activeImage, setActiveImage] = useState('media/images/placeholder-image.png');
    const [imageNumber, setImageNumber] = useState(0);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const eventResponse = await EventService.getById(params.id);
            setCurrentEvent(eventResponse.data);
            
            if (eventResponse.data.images.length !== 0) {
                setActiveImage(eventResponse.data.images[0].image_url);
            }
        }

        fetchData().catch(error => {
            navigate('/');
        });
    }, []);

    const handleOpenForm = event => {
        setSeatsSelectionOpened(true);
    }
    
    const handleCloseForm = event => {
        setSeatsSelectionOpened(false);
    }

    const openNextImage = () => {
        const nextImageNumber = imageNumber === currentEvent.images.length - 1 ? 0 : imageNumber + 1;

        setImageNumber(nextImageNumber);
        setActiveImage(currentEvent.images[nextImageNumber].image_url);
    }

    const openPrevImage = () => {
        const prevImageNumber = imageNumber === 0 ? currentEvent.images.length - 1 : imageNumber - 1;

        setImageNumber(prevImageNumber);
        setActiveImage(currentEvent.images[prevImageNumber].image_url);
    }

    return (
        <div className="d-flex justify-content-evenly align-items-center mt-3">
            <div className="d-flex flex-column">
                <div className="pt-5">
                    <img style={{ height: '35vh' }} src={`http://127.0.0.1:8000/${activeImage}`}/>
                    { !currentEvent.images ? null : currentEvent.images.length === 0 ? null :
                    <div className="mt-3">
                        <button className="btn btn-outline-secondary mx-3" onClick={ openPrevImage }>
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <span>{ imageNumber + 1 }</span>
                        <button className="btn btn-outline-secondary mx-3" onClick={ openNextImage }>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div> } 
                </div>
                <button className="btn btn-outline-primary mt-5" onClick={ handleOpenForm }>
                    <i className="bi bi-cart"> </i> 
                    Purchase ticket
                </button>
            </div>
            <div className="mt-3">
                <h2>{ currentEvent.name }</h2>
                <ul className="list-group mt-2 py-3">
                    <li className="list-group-item only-top-borders">
                        <strong>Date: </strong>{ currentEvent.date }
                    </li>
                    <li className="list-group-item only-top-borders">
                        <strong>Start: </strong>{ currentEvent.start }
                    </li>
                    <li className="list-group-item only-top-borders">
                        <strong>End: </strong>{ currentEvent.end }
                    </li>
                    <li className="list-group-item only-top-borders">
                        <strong>Stadium: </strong>{ !currentEvent.hall ? '' : currentEvent.hall.stadium.name }
                    </li>
                    <li className="list-group-item only-top-borders">
                        <strong>Hall: </strong>{ !currentEvent.hall ? '' :  currentEvent.hall.name }
                    </li>
                    <li className="list-group-item only-top-borders">
                        <strong>Price: </strong>{ currentEvent.price }
                    </li>
                </ul>
            </div>
            <SeatsTicketSelectionModal 
                eventId={ params.id }
                showModal={ seatsSelectionOpened } 
                handleClose={ handleCloseForm }
            />
        </div>
    )
}   

export default EventPage;