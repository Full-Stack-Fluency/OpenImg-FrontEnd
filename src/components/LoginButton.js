import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import "./LoginButton.css";



const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <Button variant="" className="inButton"  class="btn btn-outline" onClick={() => loginWithRedirect()}><p>Log In</p></Button>;
};


export default LoginButton;
