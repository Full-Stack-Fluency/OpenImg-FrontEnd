import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Hamburger from './Hamburger.js';
import LoginButton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';
import InputForm from './InputForm.js';

class Generate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayObj : {}
        }
      }
      handleSubmitPrompt = (e) => {
        e.preventDefault();
        let userInput = {
          prompt: e.target.prompt.value,
          userEmail: e.target.userEmail.value,
          imgSrc: e.target.imgSrc.value
        }
        this.setState({
            displayObj: userInput
          });
      }

      savePrompt = async () => {
        if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        let config = {
          method: 'post',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/item',
          headers: {
            "Authorization": `Bearer ${jwt}`
          },
          data: this.state.displayObj
        }
        try {
           await axios(config);
        } catch (err) {
          console.log('error saving to database: ', err.response.data);
        }
      }
      }

      render(){
        return(
            <>
            <Hamburger/>
            {this.props.auth0.isAuthenticated ? <LogoutButton/> : <LoginButton />}
            <InputForm handleSubmitPrompt = {this.handleSubmitPrompt} savePrompt = {this.savePrompt}/>
            {this.state.displayObj === {} ? <img src={this.state.imgSrc} alt="displayed response" /> : <p></p>}
            </>
        )
      }

}






export default withAuth0(Generate);