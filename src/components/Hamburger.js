import React from 'react';
import { Nav, Navbar} from "react-bootstrap";
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';

class Hamburger extends React.Component {
    render() {
        return (
            //this will be our nav thing 
            <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark" >
                <Navbar.Brand href="/">
                    Menu
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/edit">Edit Prompts</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </Navbar>
            
        );
    }
}


export default withAuth0(Hamburger);
