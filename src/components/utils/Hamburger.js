import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton.js";
import LogoutButton from "./LogoutButton.js";
import { LinkContainer } from "react-router-bootstrap";

class Hamburger extends React.Component {
  render() {
    return (
      <>
        <div className="menu">
          <Navbar collapseOnSelect expand="xxxl" sticky="top">
            <div className="hamburger">
              <Navbar.Toggle />
            </div>
            {this.props.auth0.isAuthenticated ? (
              <LogoutButton />
            ) : (
              <LoginButton />
            )}
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/">
                  <Nav.Link href="/">Generate</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/edit">
                  <Nav.Link href="/edit">View Saved</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/about">
                  <Nav.Link href="/about">About</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </>
    );
  }
}

export default withAuth0(Hamburger);
