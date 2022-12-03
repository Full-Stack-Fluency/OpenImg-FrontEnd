import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import "./LogoutButton.css";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button variant="" className="outButton" class="btn btn-outline" onClick={() => logout({ returnTo: window.location.origin })}>
      <p>Log Out</p>
    </Button>
  );
};
export default LogoutButton;
