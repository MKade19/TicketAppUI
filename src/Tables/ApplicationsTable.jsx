import Table from 'react-bootstrap/Table';
import ApplicationService from '../Services/ApplicationService';
import DialogMessages from '../Util/DialogMessages';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

const ApplicationsTable = ({ handleOpenForm, applications, fetchData }) => {
    const { user } = useContext(AuthContext);

    const deleteHandler = async (id, event) => {
        DialogMessages.confirmMessage('Are you sure, to delete the application?')
        .then(async (result) => {
            if (result.isConfirmed) { 
                await ApplicationService.deleteById(id);
                DialogMessages.successMessage("Application has been deleted");
                await fetchData();
            } else if (result.isDenied) {
                return;
            }
        })
    }

    const approveHandler = async (id, event) => {
        DialogMessages.confirmMessage('Are you sure, to approve the application?')
        .then(async (result) => {
            try {
                if (result.isConfirmed) {
                    await ApplicationService.changeStatus({ id, status: 'approved'});
                    DialogMessages.successMessage("Application has been approved");
                    await fetchData();
                } else if (result.isDenied) {
                    return;
                }
            } catch (error) {
                DialogMessages.errorMessage(error.response.data.error);
            }
            
        })
    }

    const denyHandler = async (id, event) => {
        DialogMessages.confirmMessage('Are you sure, to deny the application?')
        .then(async (result) => {
            if (result.isConfirmed) {
                await ApplicationService.changeStatus({ id, status: 'denied'});
                DialogMessages.successMessage("Application has been denied");
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
                <td>{application.status}</td>
                <td>{application.created_date.split('T')[0]}</td>
                { user().role.permission_application === 'readonly' ? 
                <td>{ application.event.name }</td>
                 : null }
                { user().role.permission_application === 'readonly' ? 
                <td>{ application.seats[0].hall.name }</td>
                 : null }
                <td>
                    <button className='btn btn-outline-primary' onClick={ e => { handleOpenForm(application.id, e) } }>
                        { user().role.permission_application === 'editable' ? 
                            <i className="bi bi-pen"></i> : 
                            <i className="bi bi-chevron-expand"></i> }
                    </button> 
                </td>
                { user().role.permission_application_status === 'editable' ? 
                <td>
                    <button className='btn btn-outline-success' onClick={ e => { approveHandler(application.id, e) } }>
                        <i className="bi bi-check2"></i>
                    </button> 
                </td>
                 : null }   
                { user().role.permission_application_status === 'editable' ? 
                <td>
                    <button className='btn btn-outline-danger' onClick={ e => { denyHandler(application.id, e) } }>
                        <i className="bi bi-x-lg"></i>
                    </button> 
                </td>
                 : null }  
                { user().role.permission_application === 'editable' ? 
                <td>
                    <button className='btn btn-outline-danger' onClick={ e => { deleteHandler(application.id, e) } }>
                        <i className="bi bi-trash"></i>
                    </button> 
                </td>
                 : null }    
            </tr>
        )
    }

    return (
        <div className='my-4 px-4'>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Created date</th>
                        { user().role.permission_application === 'readonly' ? 
                        <th>Event</th>
                        : null }
                        { user().role.permission_application === 'readonly' ? 
                        <th>Hall</th>
                        : null }
                        <th>
                            { user().role.permission_application === 'editable' ? 'Edit' : 'View seats' }
                        </th>
                        { user().role.permission_application_status === 'editable' ? 
                        <th>Approve</th>
                        : null }
                        { user().role.permission_application_status === 'editable' ? 
                        <th>Deny</th>
                        : null }
                        { user().role.permission_application === 'editable' ? 
                        <th>Delete</th>
                        : null }
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