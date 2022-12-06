import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import "./LogoutButton.css";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button variant="secondary" className="log" onClick={() => logout({ returnTo: window.location.origin })}>
      <h3 >Log Out</h3>
    </Button>
  );
};
export default LogoutButton;
