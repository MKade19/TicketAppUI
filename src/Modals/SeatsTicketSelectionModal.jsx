import { Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import ApplicationService from "../Services/ApplicationService";
import TicketSeatsTable from "../Tables/TicketSeatsTable";
import TicketService from "../Services/TicketService";
import AuthContext from '../Context/AuthContext';
import DialogMesages from "../Util/DialogMessages";

const SeatsTicketSelectionModal = ({ eventId, showModal, handleClose }) => {
    const [application, setApplication] = useState({});
    const { user } = useContext(AuthContext);
 
    const fetchData = async () => {
        const applicationData = await ApplicationService.getApprovedByEvent(eventId);
        setApplication(applicationData.data);
    }

    useEffect(() => {
        if (eventId) {
            fetchData().catch(console.error);
        }
    }, [eventId]);

    const handleSubmit = selectedSeats => {
        if (selectedSeats.length === 0) {
            DialogMesages.errorMessage("Select one or many seats to add!");
            return;
        }

        selectedSeats.forEach(async seat => {
            await TicketService.createOne({
                application: application.id, 
                seat: seat.id, 
                customer: user().id
            });
        });

        handleClose();
        DialogMesages.successMessage("Tickets were added to cart.");
    }

    return (
        <Modal show={showModal}
            size="lg"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered>
            <Modal.Header>
                <Modal.Title>
                    Available seats
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <TicketSeatsTable application={ application } handleSubmit={ handleSubmit }/>          
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={ handleClose }>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default SeatsTicketSelectionModal;