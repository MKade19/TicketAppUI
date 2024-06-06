import { useState, useEffect, useContext } from "react";
import StadiumService from "../Services/StadiumService";
import ApplicationsTable from "../Tables/ApplicationsTable";
import ApplicationEditModal from "../Modals/ApplicationEditModal";
import AuthContext from '../Context/AuthContext';

const StadiumAdminProfile = () => {
    const { user } = useContext(AuthContext);

    const [applications, setApplications] = useState([]);
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [applicationId, setApplicationId] = useState(null);

    const fetchData = async () => {
        const applicationsData = await StadiumService.getApplicationsByStadiumAdmin(user().id);
        setApplications(applicationsData.data);   
    }

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);

    const handleOpenForm = (id, event) => {
        setApplicationId(id);
        setEditFormOpened(true);
    }
    
    const handleCloseForm = event => {
        setEditFormOpened(false);
    }

    return (
        <>
            <h3 className="mb-4">Applications</h3>
            <ApplicationsTable fetchData={ fetchData }
                applications={ applications }
                handleOpenForm={ handleOpenForm }
            />
            <ApplicationEditModal applicationId={ applicationId }
                fetchData={ fetchData }
                handleClose={ handleCloseForm }
                showModal={ editFormOpened }
            />
        </>
    );
}

export default StadiumAdminProfile;