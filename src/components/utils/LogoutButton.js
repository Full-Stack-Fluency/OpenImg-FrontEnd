import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from "react-bootstrap/Button";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div class="loginButton">
      <Button
        variant="secondary"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        <h3>Log Out</h3>
      </Button>
    </div>
  );
};

export default LogoutButton;
