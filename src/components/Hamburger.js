import React from 'react';
import { Nav, Navbar} from "react-bootstrap";

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
            </Navbar>
        );
    }
}


export default Hamburger;