import Table from 'react-bootstrap/Table';
import EventService from '../Services/EventService';
import DialogMessages from '../Util/DialogMessages';

const EventsTable = ({ handleOpenForm, handleOpenApplicationsView, events, fetchData }) => {
    const deleteHandler = async (id, event) => {
        DialogMessages.confirmMessage('Are you sure, to delete the event?')
        .then(async result => {
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
                <td>{event.hall.name}</td>
                <td>
                    <button className='btn btn-outline-primary' onClick={ e => { handleOpenApplicationsView(event.id, e) } }>
                        <i className="bi bi-chevron-expand"></i>
                    </button> 
                </td>
                <td>
                    <button className='btn btn-outline-primary' onClick={ e => { handleOpenForm(event.id, e) } }>
                        <i className="bi bi-pen"></i>
                    </button> 
                </td>
                <td>
                    <button className='btn btn-outline-danger' onClick={ e => { deleteHandler(event.id, e) } }>
                        <i className="bi bi-trash"></i>
                    </button> 
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
                        <th>Hall</th>
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