import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import InputForm from './InputForm.js';
import { Button, Spinner, Card, Popover } from 'react-bootstrap';
import './Generate.css';
import Confetti from "react-confetti";

class Generate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img1Url: '',
      img2Url: '',
      img3Url: '',
      img4Url: '',
      img5Url: '',
      displayPopover0: false,
      displayPopover1: false,
      displayPopover2: false,
      displayPopover3: false,
      displayPopover4: false,
      emotionPopover0: '',
      emotionPopover1: '',
      emotionPopover2: '',
      emotionPopover3: '',
      emotionPopover4: '',
      generatedImgArr: [],
      popOverShow0: false,
      popOverShow1: false,
      popOverShow2: false,
      popOverShow3: false,
      popOverShow4: false,
      prompt: '',
      stopSpinner: false,
      emotionValue0:'',
      emotionValue1:'',
      emotionValue2:'',
      emotionValue3:'',
      emotionValue4:'',
      emotionSentimentsArrs0:[],
      emotionSentimentsArrs1:[],
      emotionSentimentsArrs2:[],
      emotionSentimentsArrs3:[],
      emotionSentimentsArrs4:[],
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
    this.setState({
      stopConfetti:true,
      stopSpinner: true,
      popOverShow:false,
      displayPopover0: false,
      displayPopover1: false,
      displayPopover2: false,
      displayPopover3: false,
      displayPopover4: false,
      popOverShow0: false,
      popOverShow1: false,
      popOverShow2: false,
      popOverShow3: false,
      popOverShow4: false
    });
    console.log(config);
    let generatedImg = await axios(config);
    this.setState({
      generatedImgArr: generatedImg.data.data,
      img1Url: generatedImg.data.data[0].url,
      img2Url: generatedImg.data.data[1].url,
      img3Url: generatedImg.data.data[2].url,
      img4Url: generatedImg.data.data[3].url,
      img5Url: generatedImg.data.data[4].url,
      stopSpinner: false,
      stopConfetti: true
    });
  }
  getEmotion = async (x) => {
    let reqbodyObj = { url: this.state.generatedImgArr[x].url }
    const config = {
      method: 'post',
      baseURL: process.env.REACT_APP_SERVER,
      url: '/item/emotion',
      data: reqbodyObj
    }
    const emotions = await axios(config);
    console.log(emotions);
    const poppers = `emotionPopover${x}`;
    const displayPoppers = `displayPopover${x}`
    const emotionValues = `emotionValue${x}`
    const emotionSentimentsArrs = `emotionSentimentsArrs${x}`
    if (emotions.data.length !== 0) {
      console.log('emotion return isnt blank');
      this.setState({
        [displayPoppers] : true,
        [poppers]: x,
        [emotionValues]: emotions.data[0].emotion.value,
        [emotionSentimentsArrs]: emotions.data[0].emotion.sentiments,
      })
    } else {
      console.log('emotion return is blank');
      const poppersFail = `popOverShow${x}`
      this.setState({
        [poppersFail]: true
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
    console.log(this.state.emotionPopover0);
    console.log(this.state.emotionValue);
    console.log(this.state.popOverShow);
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
      <div handleSubmitPrompt={this.handleSubmitPrompt}></div>
        <div className="container">
          <div className="drop">
            <InputForm className="inputBox" handleSubmitPrompt={this.handleSubmitPrompt} savePrompt={this.savePrompt} handleFormChange={this.handleFormChange} />
            {this.state.stopSpinner && this.state.stopConfetti && <Spinner animation="border" /> && <Confetti className="confetti" width={10000} height={2000} gravity={0.2} /> }
            
          </div>
        </div>
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
        <div className="container2">
          {this.state.img1Url &&
            <>
              <Card className="carddd">
                <Card.Img variant="top" src={this.state.img1Url} key={0} alt="Generated with Dall-E 2" />
                <Card.Body>
                  {this.props.auth0.isAuthenticated && this.state.img1Url && <Button variant="primary" onClick={() => this.savePrompt(0)} >Save to Collection</Button>}
                  {this.state.img1Url && <Button className="button1" onClick={() => this.getEmotion(0)}>Get Emotion</Button>}
                </Card.Body>
              </Card>

              {this.state.displayPopover0 &&
                <div className="popoverShowed">
                  <Popover id="emotion value">
                    <Popover.Header as="h3">
                     {this.state.emotionValue0}
                    </Popover.Header>
                    <Popover.Body>
                      Anger :{this.state.emotionSentimentsArrs0.angry.toFixed(4)}
                      <br></br>
                      Disgust: {this.state.emotionSentimentsArrs0.disgust.toFixed(4)}
                      <br></br>
                      Fear: {this.state.emotionSentimentsArrs0.fear.toFixed(4)}
                      <br></br>
                      Happy: {this.state.emotionSentimentsArrs0.happy.toFixed(4)}
                      <br></br>
                      Neutral: {this.state.emotionSentimentsArrs0.neutral.toFixed(4)}
                      <br></br>
                      Sad: {this.state.emotionSentimentsArrs0.sad.toFixed(4)}
                      <br></br>
                      Surprise: {this.state.emotionSentimentsArrs0.surprise.toFixed(4)}
                    </Popover.Body>
                  </Popover>
                </div>
              }
              {this.state.popOverShow0 &&
                <div className="popoverFailed">
                  <Popover id="failed">
                    <Popover.Header as="h3">
                      Unable to read emotion
                    </Popover.Header>
                  </Popover>
                </div>
              }
              <Card className="carddd">
                <Card.Img variant="top" src={this.state.img2Url} key={1} alt="Generated with Dall-E 2" />
                <Card.Body>
                  {this.props.auth0.isAuthenticated && this.state.img1Url && <Button variant="primary" onClick={() => this.savePrompt(1)} >Save to Collection</Button>}
                  {this.state.img1Url && <Button className="button2" onClick={() => this.getEmotion(1)}>Get Emotion</Button>}
                  {this.state.displayPopover1 &&
                    <Popover id="emotion value">
                      <Popover.Header as="h3">
                        {this.state.emotionValue1}
                        {/* {this.state.emotionSentimentsArr} */}
                      </Popover.Header>
                      <Popover.Body>
                        Anger :{this.state.emotionSentimentsArrs1.angry.toFixed(4)}
                        <br></br>
                        Disgust: {this.state.emotionSentimentsArrs1.disgust.toFixed(4)}
                        <br></br>
                        Fear: {this.state.emotionSentimentsArrs1.fear.toFixed(4)}
                        <br></br>
                        Happy: {this.state.emotionSentimentsArrs1.happy.toFixed(4)}
                        <br></br>
                        Neutral: {this.state.emotionSentimentsArrs1.neutral.toFixed(4)}
                        <br></br>
                        Sad: {this.state.emotionSentimentsArrs1.sad.toFixed(4)}
                        <br></br>
                        Surprise: {this.state.emotionSentimentsArrs1.surprise.toFixed(4)}
                      </Popover.Body>
                    </Popover>
                  }
                  {this.state.popOverShow1 &&
                    <Popover id="failed">
                      <Popover.Header as="h3">
                        Unable to read emotion
                      </Popover.Header>
                    </Popover>}
                </Card.Body>
              </Card>
              <Card className="carddd">
                <Card.Img variant="top" src={this.state.img3Url} key={2} alt="Generated with Dall-E 2" />
                <Card.Body>
                  {this.props.auth0.isAuthenticated && this.state.img1Url && <Button variant="primary" onClick={() => this.savePrompt(2)} >Save to Collection</Button>}
                  {this.state.img1Url && <Button className="button3" onClick={() => this.getEmotion(2)}>Get Emotion</Button>}
                  {this.state.displayPopover2 &&
                    <Popover id="emotion value">
                      <Popover.Header as="h3">
                        {this.state.emotionValue2}
                        {/* {this.state.emotionSentimentsArr} */}
                      </Popover.Header>
                      <Popover.Body>
                        Anger :{this.state.emotionSentimentsArrs2.angry.toFixed(4)}
                        <br></br>
                        Disgust: {this.state.emotionSentimentsArrs2.disgust.toFixed(4)}
                        <br></br>
                        Fear: {this.state.emotionSentimentsArrs2.fear.toFixed(4)}
                        <br></br>
                        Happy: {this.state.emotionSentimentsArrs2.happy.toFixed(4)}
                        <br></br>
                        Neutral: {this.state.emotionSentimentsArrs2.neutral.toFixed(4)}
                        <br></br>
                        Sad: {this.state.emotionSentimentsArrs2.sad.toFixed(4)}
                        <br></br>
                        Surprise: {this.state.emotionSentimentsArrs2.surprise.toFixed(4)}
                      </Popover.Body>
                    </Popover>
                  }
                  {this.state.popOverShow2 &&
                    <Popover id="failed">
                      <Popover.Header as="h3">
                        Unable to read emotion
                      </Popover.Header>
                    </Popover>}
                </Card.Body>
              </Card>
              <Card className="carddd">
                <Card.Img variant="top" src={this.state.img4Url} key={3} alt="Generated with Dall-E 2" />
                <Card.Body>
                  {this.props.auth0.isAuthenticated && this.state.img1Url && <Button variant="primary" onClick={() => this.savePrompt(3)} >Save to Collection</Button>}
                  {this.state.img1Url && <Button className="button4" onClick={() => this.getEmotion(3)}>Get Emotion</Button>}
                  {this.state.displayPopover3 &&
                    <Popover id="emotion value">
                      <Popover.Header as="h3">
                        {this.state.emotionValue3}
                        {/* {this.state.emotionSentimentsArr} */}
                      </Popover.Header>
                      <Popover.Body>
                        Anger :{this.state.emotionSentimentsArrs3.angry.toFixed(4)}
                        <br></br>
                        Disgust: {this.state.emotionSentimentsArrs3.disgust.toFixed(4)}
                        <br></br>
                        Fear: {this.state.emotionSentimentsArrs3.fear.toFixed(4)}
                        <br></br>
                        Happy: {this.state.emotionSentimentsArrs3.happy.toFixed(4)}
                        <br></br>
                        Neutral: {this.state.emotionSentimentsArrs3.neutral.toFixed(4)}
                        <br></br>
                        Sad: {this.state.emotionSentimentsArrs3.sad.toFixed(4)}
                        <br></br>
                        Surprise: {this.state.emotionSentimentsArrs3.surprise.toFixed(4)}
                      </Popover.Body>
                    </Popover>
                  }
                  {this.state.popOverShow3 &&
                    <Popover id="failed">
                      <Popover.Header as="h3">
                        Unable to read emotion
                      </Popover.Header>
                    </Popover>}
                </Card.Body>
              </Card>
              <Card className="carddd">
                {this.state.img1Url && <Card.Img variant="top" src={this.state.img5Url} key={4} alt="Generated with Dall-E 2" />}
                <Card.Body>
                  {this.props.auth0.isAuthenticated && this.state.img1Url && <Button className="button5" variant="primary" onClick={() => this.savePrompt(4)} >Save to Collection</Button>}
                  {this.state.img1Url && <Button onClick={() => this.getEmotion(4)}>Get Emotion</Button>}
                  {this.state.displayPopover4 &&
                    <Popover id="emotion value">
                      <Popover.Header as="h3">
                        {this.state.emotionValue4}
                        {/* {this.state.emotionSentimentsArr} */}
                      </Popover.Header>
                      <Popover.Body>
                        Anger :{this.state.emotionSentimentsArrs4.angry.toFixed(4)}
                        <br></br>
                        Disgust: {this.state.emotionSentimentsArrs4.disgust.toFixed(4)}
                        <br></br>
                        Fear: {this.state.emotionSentimentsArrs4.fear.toFixed(4)}
                        <br></br>
                        Happy: {this.state.emotionSentimentsArrs4.happy.toFixed(4)}
                        <br></br>
                        Neutral: {this.state.emotionSentimentsArrs4.neutral.toFixed(4)}
                        <br></br>
                        Sad: {this.state.emotionSentimentsArrs4.sad.toFixed(4)}
                        <br></br>
                        Surprise: {this.state.emotionSentimentsArrs4.surprise.toFixed(4)}
                      </Popover.Body>
                    </Popover>
                  }
                  {this.state.popOverShow4 &&
                    <Popover id="failed">
                      <Popover.Header as="h3">
                        Unable to read emotion
                      </Popover.Header>
                    </Popover>}
                </Card.Body>
              </Card>
            </>
          }
        </div>
        {/* {this.state.first ? <div></div> : generatedItems} */}
      </>
    )
  }

}

export default withAuth0(Generate);
