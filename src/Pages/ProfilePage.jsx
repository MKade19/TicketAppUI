import { useContext, useEffect, useState } from 'react';
import AuthContext from '../Context/AuthContext';
import EventAdminProfile from '../Profiles/EventAdminProfile';
import StadiumAdminProfile from '../Profiles/StadiumAdminProfile';
import TicketService from '../Services/TicketService';
import TicketsTable from '../Tables/TicketsTable';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);

    const fetchData = async () => {
        const ticketsResponse = await TicketService.getForCustomerByStatus(user().id, true);
        setTickets(ticketsResponse.data);
    }

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);
    
    return (
        <>
            <h2 className="mb-4">{ user().fullname } profile</h2>
            { user().role.name === 'Event administrator' ? <EventAdminProfile/> : null }
            { user().role.name === 'Stadium administrator' ? <StadiumAdminProfile/> : null }
            <h3 className='mt-4 mb-4'>Your tickets</h3>
            <TicketsTable tickets={ tickets } fetchData={ fetchData }/>
        </>
    );
}

export default ProfilePage;