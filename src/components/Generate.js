import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
// import Hamburger from './Hamburger.js';
// import LoginButton from './LoginButton.js';
// import LogoutButton from './LogoutButton.js';
import InputForm from './InputForm.js';

class Generate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generatedImgObj: '',
      prompt: '',
      items: [],
    }
  }

  handleSubmitPrompt = async (e) => {
    let reqbodyObj = { prompt: this.state.prompt }
    e.preventDefault();
    let config = {
      method: 'post',
      baseURL: process.env.REACT_APP_SERVER,
      url: '/item/generate',
      data: reqbodyObj
    }
    let generatedImg = await axios(config);
    this.setState({
      generatedImgObj: generatedImg.data.data[0]
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
        data: this.state.generatedImgObj
      }
      try {
        await axios(config);
      } catch (err) {
        console.log('error saving to database: ', err.response.data);
      }
    }
  }

  handleFormChange = e => {
    this.setState({
      prompt: e.target.value
    })
  }

  render() {
    return (
      <>
        {/* <Hamburger /> */}
        
        <InputForm handleSubmitPrompt={this.handleSubmitPrompt} savePrompt={this.savePrompt} handleFormChange={this.handleFormChange} />
        {this.state.generatedImgObj === '' ? <p>Image will display here</p> : <img src={this.state.generatedImgObj.url} alt="Generated by DALL E 2" />}
        {/* {this.state.generatedImgObj &&  <img src={this.state.generatedImgObj.url} alt="Generated by DALL E 2" /> } */}
        {/* <img src={this.state.generatedImgObj.url} alt="Generated by DALL E 2" /> */}
      </>
    )
  }

}






export default withAuth0(Generate);