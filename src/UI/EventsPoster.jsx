import { useNavigate } from "react-router-dom";

const EventsPoster = ({ events }) => {
    const navigate = useNavigate();

    const createElement = (event, eventNumber) => {
        const isEventFirst = eventNumber === 0;

        return <div key={ event.id } className={'carousel-item img-fluid' + (isEventFirst ? ' active' : '')}>
            <img src="..." className="d-block w-100" alt="..."/>
            <div className="item d-none d-md-block">
                <h5>{event.name}</h5>
                <p>Description placeholder</p>
                <p>Event date: {event.date}</p>
                <button type='button' 
                    className='btn btn-primary'
                    onClick={ e => viewEventInfo(event.id, e) }
                >
                    View full info
                </button>
            </div>
        </div>
    }

    const createButton = eventNumber => {
        const isEventFirst = eventNumber === 0;

        return <button type="button"
            key={ eventNumber } 
            data-bs-target="#carouselCaptions" 
            data-bs-slide-to={ eventNumber } 
            className={ isEventFirst ? "active" : '' } 
            aria-current={ isEventFirst }
            aria-label={ `Slide ${ eventNumber }` } />
    }

    const addElements = () => {
        return events.map(e => createElement(e, events.indexOf(e)));
    }

    const addButtons = () => {
        return events.map(e => createButton(events.indexOf(e))); 
    }

    const viewEventInfo = (id, event) => {
        navigate(`/events/${id}`);
    }

    return (
        <div id="carouselCaptions" className="carousel slide pb-5" data-bs-ride="carousel">
            <div className="carousel-indicators">
                { addButtons() }
            </div>
            <div className="carousel-inner">
                { addElements() }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default EventsPoster;