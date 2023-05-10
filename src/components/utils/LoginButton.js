import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import Button from "react-bootstrap/Button";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div class="loginButton">
      <Button variant="secondary" onClick={() => loginWithRedirect()}>
        <h3>Log In</h3>
      </Button>
    </div>
  );
};

export default LoginButton;
