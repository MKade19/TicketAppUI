import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import ApplicationService from "../Services/ApplicationService";
import ApplicationsTable from "../Tables/ApplicationsTable";
import ApplicationEditModal from "./ApplicationEditModal";

const ApplicationsViewModal = ({ eventId, showModal, handleClose }) => {
    const [applications, setApplications] = useState([]);
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [applicationId, setApplicationId] = useState(null);

    const fetchData = async () => {
        const applicationsData = await ApplicationService.getByEvent(eventId);
        setApplications(applicationsData.data);
    }

    const handleOpenForm = (id, event) => {
        setApplicationId(id);
        setEditFormOpened(true);
    }
    
    const handleCloseForm = event => {
        setEditFormOpened(false);
    }

    useEffect(() => {
        if (eventId) {
            fetchData().catch(console.error);
        }
    }, [eventId]);

    return (
        <Modal show={showModal}
            size="lg"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered>
            <Modal.Header>
                <Modal.Title>{ 
                    applications.length === 0 ? '' : 
                    applications[0].event.name + ' applications view' 
                }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { applications.length === 0 ? 
                    <h4 className="mb-3">There is no applications for this event</h4> : 
                    null }
                <div className="d-flex justify-content-center">
                    <button className="btn btn-outline-primary" onClick={ event => { handleOpenForm(null, event) } }>
                        <div className="bi bi-plus-circle"> Create new</div>
                    </button>
                </div> 
                { applications.length !== 0 ? 
                    <ApplicationsTable
                        applications={ applications }
                        handleOpenForm={ handleOpenForm }
                        fetchData={ fetchData }
                    /> : null }
                <ApplicationEditModal
                    applicationId={ applicationId }
                    eventId={ eventId }
                    fetchData={ fetchData }
                    handleClose={ handleCloseForm }
                    showModal={ editFormOpened }
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

export default ApplicationsViewModal;