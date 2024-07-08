import Table from 'react-bootstrap/Table';

const ApplicationSeatsTable = ({ seats }) => {
    const addRows = () => {
        return seats.map(e => createRow(e));
    }
 
    const createRow = seat => {
        return (
            <tr key={seat.id}>
                <td>{seat.number}</td> 
                <td>{seat.row}</td> 
                <td>{seat.sector}</td> 
            </tr>
        )
    }

    return (
        <div className='my-4 px-4'>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Row</th>
                        <th>Sector</th>
                    </tr>
                </thead>
                <tbody>
                    {addRows()}
                </tbody>
            </Table>
        </div>
    )
}

export default ApplicationSeatsTable;