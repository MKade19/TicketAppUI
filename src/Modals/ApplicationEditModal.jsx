import { Modal } from "react-bootstrap";
import ApplicationEditForm from "../Forms/ApplicationEditForm";

const ApplicationEditModal = ({ applicationId, eventId, showModal, handleClose, fetchData }) => {
    return (
        <Modal show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered>
            <Modal.Header>
                <Modal.Title>{applicationId ? 'Edit' : 'Create'} application</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ApplicationEditForm 
                    applicationId={ applicationId }
                    eventId={ eventId } 
                    handleClose={ handleClose } 
                    fetchData={ fetchData }
                />
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={ handleClose }>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ApplicationEditModal;