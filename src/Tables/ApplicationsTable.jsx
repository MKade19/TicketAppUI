import Table from 'react-bootstrap/Table';
import ApplicationService from '../Services/ApplicationService';
import DialogMessages from '../Util/DialogMessages';
// import { useContext } from 'react';
// import AuthContext from '../Context/AuthContext';

const ApplicationsTable = ({ handleOpenForm, applications, fetchData }) => {
    // const { user } = useContext(AuthContext);

    const deleteHandler = async (id, event) => {
        DialogMessages.confirmMessage('Are you sure, to delete the application?')
        .then(async (result) => {
            if (result.isConfirmed) {
                DialogMessages.successMessage("Application has been deleted");
                await ApplicationService.deleteById(id);
                await fetchData();
            } else if (result.isDenied) {
                return;
            }
        })
    }

    const addRows = () => {
        return applications.map(e => createRow(e));
    }
 
    const createRow = application => {
        return (
            <tr key={application.id}>
                <td>{new Date(application.date).toLocaleDateString()}</td>
                <td>{application.start}</td>
                <td>{application.end}</td>
                <td>{application.status}</td>
                <td>
                {/* {user().userRole.permission_appointment === 'editable' ?  */}
                    <button className='btn btn-outline-primary' onClick={ e => { handleOpenForm(application.id, e) } }>
                        <i className="bi bi-pen"></i>
                    </button> 
                    {/* : null} */}
                </td>
                <td>
                {/* {user().userRole.permission_appointment === 'editable' ?  */}
                    <button className='btn btn-outline-danger' onClick={ e => { deleteHandler(application.id, e) } }>
                        <i className="bi bi-trash"></i>
                    </button> 
                    {/* : null}    */}
                </td>
            </tr>
        )
    }

    return (
        <div className='my-4 px-4'>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {addRows()}
                </tbody>
            </Table>
        </div>
    )
}

export default ApplicationsTable;