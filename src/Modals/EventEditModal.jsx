import { Modal } from "react-bootstrap";
import EventEditForm from "../Forms/EventEditForm";

const EventEditModal = ({ eventId, showModal, handleClose, fetchData }) => {
    return (
        <Modal show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered>
            <Modal.Header>
                <Modal.Title>{eventId ? 'Edit' : 'Create'} event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EventEditForm eventId={eventId} handleClose={handleClose} fetchData={ fetchData }/>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={handleClose}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default EventEditModal;