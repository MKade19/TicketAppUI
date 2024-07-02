import { useEffect, useMemo, useState } from "react";
import EventService from '../Services/EventService';
import { useNavigate, useParams } from "react-router-dom";

const EventPage = () => {
    const [currentEvent, setCurrentEvent] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const eventResponse = await EventService.getById(params.id);
            setCurrentEvent(eventResponse.data);
        }

        if (params.id) {
            fetchData().catch(console.error);
        }
        else{
            navigate('/');
        }
    }, []);

    return (
        <div className="d-flex justify-content-around align-items-center mt-3">
            <div>
                image container
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