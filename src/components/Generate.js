import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import InputForm from './InputForm.js';
import { Button, Spinner, Card,Popover,Tabs,Tab,Image } from 'react-bootstrap';
import './Generate.css';

class Generate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img1Url: '',
      img2Url: '',
      img3Url: '',
      img4Url: '',
      img5Url: '',
      emotionPopover0: '',
      emotionPopover1: '',
      emotionPopover2: '',
      emotionPopover3: '',
      emotionPopover4: '',
      generatedImgArr: [],
      popOverShow: false,
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
      img1Url: generatedImg.data.data[0].url,
      img2Url: generatedImg.data.data[1].url,
      img3Url: generatedImg.data.data[2].url,
      img4Url: generatedImg.data.data[3].url,
      img5Url: generatedImg.data.data[4].url
    });
  }
  getEmotion = async (x) =>{
    let reqbodyObj = { url: this.state.generatedImgArr[x].url }
    const config = {
      method: 'post',
      baseURL: process.env.REACT_APP_SERVER,
      url: '/item/emotion',
      data: reqbodyObj
    }
    const emotions = await axios(config);
    const poppers =`emotionPopover${x}`;
    if (emotions !== []){
    this.setState ({
      [poppers]: x,
      emotionValue: emotions.data[0].emotion.value,
      emotionSentimentsArr: emotions.data[0].emotion.sentiments,
      emotionPopover: true,
    })} else {
      this.setState ({
        popOverShow: true
      });
    }
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
    // let generatedItems;
    // if (this.state.generatedImgArr) {
    //   generatedItems = this.state.generatedImgArr.map((item, idx) => {
    //     return (
    //       <Card style={{ width: '50rem' }}>
    //         <Card.Img variant="top" src={item.url} key={idx} alt="Generated with Dall-E 2" />
    //         <Card.Body>
    //           {this.props.auth0.isAuthenticated && <Button variant= "primary" onClick={() => this.savePrompt(idx)} >Save to Collection</Button>}
    //           <Button onClick={()=>this.getEmotion(idx)}>Get Emotion</Button>
    //           {this.state.emotionPopover && 
    //                 <Popover id = "error message for form not submit correctly">
    //                     <Popover.Header as="h3">
    //                       {this.state.emotionValue}
    //                       {/* {this.state.emotionSentimentsArr} */}
    //                     </Popover.Header>
    //                     <Popover.Body>
    //                       Anger :{this.state.emotionSentimentsArr.angry.toFixed(4)}
    //                       <br></br>
    //                       Disgust: {this.state.emotionSentimentsArr.disgust.toFixed(4)}
    //                       <br></br>
    //                       Fear: {this.state.emotionSentimentsArr.fear.toFixed(4)}
    //                       <br></br>
    //                       Happy: {this.state.emotionSentimentsArr.happy.toFixed(4)}
    //                       <br></br>
    //                       Neutral: {this.state.emotionSentimentsArr.neutral.toFixed(4)}
    //                       <br></br>
    //                       Sad: {this.state.emotionSentimentsArr.sad.toFixed(4)}
    //                       <br></br>
    //                       Surprise: {this.state.emotionSentimentsArr.surprise.toFixed(4)}
    //                     </Popover.Body>
    //                 </Popover>
    //             }
    //         </Card.Body>
    //       </Card>
    //     )
    //   });
    // } else {
    //   generatedItems = <Spinner animation="border" />;
    // }

    return (
      <>
      <div className="container">
        <div className="drop">
        <InputForm className="inputBox" handleSubmitPrompt={this.handleSubmitPrompt} savePrompt={this.savePrompt} handleFormChange={this.handleFormChange} />
        {/* <Tabs
          defaultActiveKey="Result 1"
          id="ImageResultsTabs"
          className="mb-3"
        >
      <Tab eventKey="Result 1" title="Result 1">
        {this.state.img1Url && <Image src = {this.state.img1Url}/>}
        {this.props.auth0.isAuthenticated && this.state.img1Url && <Button variant= "primary" onClick={() => this.savePrompt(0)} >Save to Collection</Button>}
        {this.state.img1Url && <Button className = "button1" onClick={()=>this.getEmotion(0)}>Get Emotion</Button>}
      </Tab> 
      <Tab eventKey="Result 2" title="Result 2">
        {this.state.img1Url && <Image src = {this.state.img2Url}/>}
        {this.props.auth0.isAuthenticated && this.state.img1Url && <Button variant= "primary" onClick={() => this.savePrompt(1)} >Save to Collection</Button>}
        {this.state.img1Url && <Button className = "button2" onClick={()=>this.getEmotion(1)}>Get Emotion</Button>}
      </Tab> 
      <Tab eventKey="Result 3" title="Result 3">
        {this.state.img1Url && <Image src = {this.state.img3Url}/>}
        {this.props.auth0.isAuthenticated && this.state.img1Url && <Button variant= "primary" onClick={() => this.savePrompt(2)} >Save to Collection</Button>}
        {this.state.img1Url && <Button className = "button3" onClick={()=>this.getEmotion(2)}>Get Emotion</Button>}
      </Tab> 
      <Tab eventKey="Result 4" title="Result 4">
        {this.state.img1Url && <Image src = {this.state.img4Url}/>}
        {this.props.auth0.isAuthenticated && this.state.img1Url && <Button variant= "primary" onClick={() => this.savePrompt(3)} >Save to Collection</Button>}
        {this.state.img1Url && <Button className = "button4" onClick={()=>this.getEmotion(3)}>Get Emotion</Button>}
      </Tab> 
      <Tab eventKey="Result 5" title="Result 5">
        {this.state.img1Url && <Image src = {this.state.img5Url}/>}
        {this.props.auth0.isAuthenticated && this.state.img1Url && <Button className = "button5" variant= "primary" onClick={() => this.savePrompt(4)} >Save to Collection</Button>}
        {this.state.img1Url && <Button onClick={()=>this.getEmotion(4)}>Get Emotion</Button>}
      </Tab> 
    </Tabs> */}
       { this.state.img1Url && 
      <>
      <Card className = "carddd">
      <Card.Img variant="top" src={this.state.img1Url} key={0} alt="Generated with Dall-E 2" />
      <Card.Body>
        {this.props.auth0.isAuthenticated && this.state.img1Url && <Button variant= "primary" onClick={() => this.savePrompt(0)} >Save to Collection</Button>}
        {this.state.img1Url && <Button className = "button1" onClick={()=>this.getEmotion(0)}>Get Emotion</Button>}
                    
                    {this.state.emotionPopover0 &&
                    <Popover id = "emotion value">
                        <Popover.Header as="h3">
                          {this.state.emotionValue}
                          {/* {this.state.emotionSentimentsArr} */}
                        </Popover.Header>
                        <Popover.Body>
                          Anger :{this.state.emotionSentimentsArr.angry.toFixed(4)}
                          <br></br>
                          Disgust: {this.state.emotionSentimentsArr.disgust.toFixed(4)}
                          <br></br>
                          Fear: {this.state.emotionSentimentsArr.fear.toFixed(4)}
                          <br></br>
                          Happy: {this.state.emotionSentimentsArr.happy.toFixed(4)}
                          <br></br>
                          Neutral: {this.state.emotionSentimentsArr.neutral.toFixed(4)}
                          <br></br>
                          Sad: {this.state.emotionSentimentsArr.sad.toFixed(4)}
                          <br></br>
                          Surprise: {this.state.emotionSentimentsArr.surprise.toFixed(4)}
                        </Popover.Body>
                    </Popover>
                    }
                    { this.state.popOverShow &&
                    <Popover id = "failed">
                      <Popover.Header as="h3">
                        Unable to read emotion
                      </Popover.Header>
                   </Popover>
                   }
                    
      </Card.Body>
      </Card>
      <Card className = "carddd">
      <Card.Img variant="top" src={this.state.img2Url} key={1} alt="Generated with Dall-E 2" />
      <Card.Body>
        {this.props.auth0.isAuthenticated && this.state.img1Url && <Button variant= "primary" onClick={() => this.savePrompt(1)} >Save to Collection</Button>}
        {this.state.img1Url && <Button className = "button2" onClick={()=>this.getEmotion(1)}>Get Emotion</Button>}
        </Card.Body>
        </Card>
      <Card className = "carddd">
      <Card.Img variant="top" src={this.state.img3Url} key={2} alt="Generated with Dall-E 2" />
      <Card.Body>
        {this.props.auth0.isAuthenticated && this.state.img1Url && <Button variant= "primary" onClick={() => this.savePrompt(2)} >Save to Collection</Button>}
        {this.state.img1Url && <Button className = "button3" onClick={()=>this.getEmotion(2)}>Get Emotion</Button>}
        </Card.Body>
        </Card>
      <Card className = "carddd">
      <Card.Img variant="top" src={this.state.img4Url} key={3} alt="Generated with Dall-E 2" />
      <Card.Body>
        {this.props.auth0.isAuthenticated && this.state.img1Url && <Button variant= "primary" onClick={() => this.savePrompt(3)} >Save to Collection</Button>}
        {this.state.img1Url && <Button className = "button4" onClick={()=>this.getEmotion(3)}>Get Emotion</Button>}
        </Card.Body>
      </Card>
      <Card className = "carddd">
      {this.state.img1Url && <Card.Img variant="top" src={this.state.img5Url} key={4} alt="Generated with Dall-E 2" />}
      <Card.Body>
        {this.props.auth0.isAuthenticated && this.state.img1Url && <Button className = "button5" variant= "primary" onClick={() => this.savePrompt(4)} >Save to Collection</Button>}
        {this.state.img1Url && <Button onClick={()=>this.getEmotion(4)}>Get Emotion</Button>}
      </Card.Body>
      </Card>
      </>
      } 
        {/* {this.state.first ? <div></div> : generatedItems} */}
        </div>
      </div>
      </>
    )
  }

}

export default withAuth0(Generate);
