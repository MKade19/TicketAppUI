import { useEffect, useState } from "react";
import EventService from '../Services/EventService';
import { useNavigate, useParams } from "react-router-dom";

const EventPage = () => {
    const [currentEvent, setCurrentEvent] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const eventResponse = await EventService.getById(params.id);

            console.log(eventResponse);

            setCurrentEvent(eventResponse.data);
        }

        fetchData().catch(error => {
            navigate('/');
        });
    }, []);



    return (
        <div className="d-flex justify-content-around align-items-center mt-3">
            <div className="d-flex flex-column">
                image container
                <button className="btn btn-primary mt-5">
                    <i className="bi bi-cart"> </i> 
                    Buy ticket
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
            
        </div>
    )
}   

export default EventPage;