import { useState, useEffect, useContext } from "react";
import StadiumService from "../Services/StadiumService";
import ApplicationsTable from "../Tables/ApplicationsTable";
import AuthContext from '../Context/AuthContext';
import SeatsViewModal from "../Modals/SeatsViewModal";

const StadiumAdminProfile = () => {
    const { user } = useContext(AuthContext);

    const [applications, setApplications] = useState([]);
    const [seatsViewOpened, setSeatsViewOpened] = useState(false);
    const [applicationId, setApplicationId] = useState(null);

    const fetchData = async () => {
        const applicationsData = await StadiumService.getApplicationsByStadiumAdmin(user().id);
        setApplications(applicationsData.data);   
    }

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);

    const handleOpenModal = (id, event) => {
        setApplicationId(id);
        setSeatsViewOpened(true);
    }
    
    const handleCloseModal = event => {
        setSeatsViewOpened(false);
    }

    return (
        <>
            <h3 className="mb-4">Applications</h3>
            <ApplicationsTable fetchData={ fetchData }
                applications={ applications }
                handleOpenForm={ handleOpenModal }
            />
            <SeatsViewModal
                applicationId={ applicationId }
                showModal={ seatsViewOpened }
                handleClose={ handleCloseModal }
            />
        </>
    );
}

export default StadiumAdminProfile;