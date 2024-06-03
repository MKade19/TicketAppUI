import { useEffect, useState, useContext } from "react";
import DialogMessages from "../Util/DialogMessages";
import EventService from "../Services/EventService";
import AuthContext from '../Context/AuthContext';

const EventEditForm = ({ eventId, handleClose, fetchData }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0.0);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            if (eventId) {
                const eventResponse = await EventService.getById(eventId);
                setName(eventResponse.data.name);
                setPrice(eventResponse.data.price);
            }
        } 

        fetchData().catch(console.error);
    }, [eventId]);

    const changeName = event => {
        setName(event.target.value);
    }

    const changePrice = event => {
        setPrice(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let response;

        try {
            if (eventId) {
                response = await EventService.updateOne({ id: eventId, name, price, administrator: user().id });
                DialogMessages.successMessage("Event has been updated");
            }
            else {
                response = await EventService.createOne({ name, price, administrator: user().id });
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
                        <label className="mx-3" htmlFor="priceInput">Price</label>
                        <input type="number" className="form-control" required id="priceInput" value={price} onChange={changePrice}/>
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