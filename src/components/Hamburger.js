import React from "react";
import { Nav, Navbar} from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton.js";
import LogoutButton from "./LogoutButton.js";
import { Link } from "react-router-dom";

class Hamburger extends React.Component {
  render() {
    return (
      //this will be our nav thing
      <>
        {/* <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark" >
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
            </Navbar> */}
        <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark">
          <Navbar.Brand>Menu</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/"> Home</Link>
              <Link to="/edit">Edit Prompts</Link>
              <Link to="/about">About</Link>
              
              
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* <Link to="/edit"> Edit</Link>
        <Link to="/about"> About</Link>
        <Link to="/"> Home</Link> */}
        {this.props.auth0.isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </>
    );
  }
}

export default withAuth0(Hamburger);
