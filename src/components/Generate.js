import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import InputForm from './InputForm.js';
import { Button, Spinner, Card } from 'react-bootstrap';
import './Generate.css';

class Generate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generatedImgArr: [],
      prompt: '',
    }
  }

  handleSubmitPrompt = async (e) => {
    this.setState({
      generatedImgArr: '',
    });
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
      generatedImgArr: generatedImg.data.data,
    });
  }

  savePrompt = async (idx) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      let schemaObj = {
        prompt: this.state.prompt,
        userEmail: this.props.auth0.user.email,
        imgSrc: this.state.generatedImgArr[idx].url
      }
      let config = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/item',
        headers: {
          "Authorization": `Bearer ${jwt}`
        },
        data: schemaObj
      }

      try {
        await axios(config);
      } catch (err) {
      }
    }
  }

  handleFormChange = e => {
    this.setState({
      prompt: e.target.value
    })
  }


  render() {
    let generatedItems;
    if (this.state.generatedImgArr) {
      generatedItems = this.state.generatedImgArr.map((item, idx) => {
        return (
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.url} key={idx} alt="Generated with Dall-E 2" />
            <Card.Body>
              {this.props.auth0.isAuthenticated && <Button variant= "primary" onClick={() => this.savePrompt(idx)} >Save to Collection</Button>}
            </Card.Body>
          </Card>
        )
      });
    } else {
      generatedItems = <Spinner animation="border" />;
    }

    return (
      <>
      <div className="container">
        <div className="drop">
        <InputForm className="inputBox" handleSubmitPrompt={this.handleSubmitPrompt} savePrompt={this.savePrompt} handleFormChange={this.handleFormChange} />
        {this.state.first ? <div></div> : generatedItems}
        </div>
      </div>
      </>
    )
  }

}

export default withAuth0(Generate);
