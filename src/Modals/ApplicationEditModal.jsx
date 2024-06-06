import { Modal } from "react-bootstrap";
import ApplicationEditForm from "../Forms/ApplicationEditForm";
import AuthContext from '../Context/AuthContext';
import { useContext } from "react";


const ApplicationEditModal = ({ applicationId, eventId, showModal, handleClose, fetchData }) => {
    const { user } = useContext(AuthContext);

    return (
        <Modal show={showModal}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered>
            <Modal.Header>
                <Modal.Title>
                    { user().role.permission_application === 'editable' ? applicationId ? 'Edit ' : 'Create ' : 'View ' }
                    application
                </Modal.Title>
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