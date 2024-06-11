import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import ApplicationService from "../Services/ApplicationService";
import ApplicationSeatsTable from "../Tables/ApplicationSeatsTable";

const SeatsViewModal = ({ applicationId, showModal, handleClose }) => {
    const [application, setApplication] = useState([]);
    const [seats, setSeats] = useState([]);

    const fetchData = async () => {
        const applicationData = await ApplicationService.getById(applicationId);
        setSeats(applicationData.data.seats);
        setApplication(applicationData.data);
    }

    useEffect(() => {
        if (applicationId) {
            fetchData().catch(console.error);
        }
    }, [applicationId]);

    return (
        <Modal show={showModal}
            size="lg"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered>
            <Modal.Header>
                <Modal.Title>
                    Seats for the application
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ApplicationSeatsTable seats={ seats }/>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={ handleClose }>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default SeatsViewModal;