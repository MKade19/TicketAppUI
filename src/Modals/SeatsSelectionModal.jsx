import { Modal } from "react-bootstrap";
import SeatsSelectionForm from "../Forms/SeatsSelectionForm";

const SeatsSelectionModal = ({ hallId, showModal, handleClose, submitSelection, initialSeats }) => {
    return (
        <Modal show={showModal}
            size="sm"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered>
            <Modal.Header>
                <Modal.Title>Seats selection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SeatsSelectionForm hallId={ hallId } 
                    submitSelection={ submitSelection } 
                    handleClose={ handleClose }
                    initialSeats={ initialSeats }
                />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={handleClose}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default SeatsSelectionModal;