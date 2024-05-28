import { useContext } from 'react'
import { NavLink, Nav, Navbar, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AuthContext from '../Context/AuthContext'

const NavigationBar = () => {
    const { logoutUser, user } = useContext(AuthContext);

    const handleLogout = event => {
        logoutUser();
    }

    return (
        <Navbar bg="light" expand="lg" data-bs-theme="light">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <LinkContainer to={"/"}>
                            <NavLink>Home</NavLink>
                        </LinkContainer>
                        <LinkContainer to={"/profile"}>
                            <NavLink>Profile</NavLink>
                        </LinkContainer>
                    </Nav>
                    <Navbar>{!user() ? '' : user().fullname + ' - ' + (!user().role ? '' : user().role.name)}&nbsp;&nbsp;&nbsp;
                    { !user ? null : <NavLink onClick={handleLogout}>Log out</NavLink> }</Navbar>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;