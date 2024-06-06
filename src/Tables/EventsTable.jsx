import Table from 'react-bootstrap/Table';
import EventService from '../Services/EventService';
import DialogMessages from '../Util/DialogMessages';
// import { useContext } from 'react';
// import AuthContext from '../Context/AuthContext';

const EventsTable = ({ handleOpenForm, handleOpenApplicationsView, events, fetchData }) => {
    // const { user } = useContext(AuthContext);

    const deleteHandler = async (id, event) => {
        DialogMessages.confirmMessage('Are you sure, to delete the event?')
        .then(async (result) => {
            if (result.isConfirmed) {
                DialogMessages.successMessage("Event has been deleted");
                await EventService.deleteById(id);
                await fetchData();
            } else if (result.isDenied) {
                return;
            }
        })
    }

    const addRows = () => {
        return events.map(e => createRow(e));
    }
 
    const createRow = event => {
        return (
            <tr key={event.id}>
                <td>{event.name}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.start}</td>
                <td>{event.end}</td>
                <td>{event.price}</td>
                <td>
                    <button className='btn btn-outline-primary' onClick={ e => { handleOpenApplicationsView(event.id, e) } }>
                        <i className="bi bi-chevron-expand"></i>
                    </button> 
                </td>
                <td>
                {/* {user().userRole.permission_appointment === 'editable' ?  */}
                    <button className='btn btn-outline-primary' onClick={ e => { handleOpenForm(event.id, e) } }>
                        <i className="bi bi-pen"></i>
                    </button> 
                    {/* : null} */}
                </td>
                <td>
                {/* {user().userRole.permission_appointment === 'editable' ?  */}
                    <button className='btn btn-outline-danger' onClick={ e => { deleteHandler(event.id, e) } }>
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
                        <th>Name</th>
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Price</th>
                        <th>View applications</th>
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

export default EventsTable;