import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import EventAdminProfile from '../Profiles/EventAdminProfile';
import StadiumAdminProfile from '../Profiles/StadiumAdminProfile';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);
    
    return (
        <>
            <h2 className="mb-4">{ user().fullname } profile</h2>
            { user().role.name === 'Event administrator' ? <EventAdminProfile/> : null }
            { user().role.name === 'Stadium administrator' ? <StadiumAdminProfile/> : null }
        </>
    );
}

export default ProfilePage;