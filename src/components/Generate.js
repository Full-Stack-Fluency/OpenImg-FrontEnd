import React from "react";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import InputForm from "./InputForm.js";
import Tilt from "react-parallax-tilt";
import { Spinner, Card } from "react-bootstrap";
import "./Generate.css";

class Generate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img1Url: "",
      img2Url: "",
      img3Url: "",
      img4Url: "",
      displayPopover0: false,
      displayPopover1: false,
      displayPopover2: false,
      displayPopover3: false,
      emotionPopover0: "",
      emotionPopover1: "",
      emotionPopover2: "",
      emotionPopover3: "",
      generatedImgArr: [],
      popOverShow0: false,
      popOverShow1: false,
      popOverShow2: false,
      popOverShow3: false,
      prompt: "",
      badWords: false,
      stopSpinner: false,
      emotionValue0: "",
      emotionValue1: "",
      emotionValue2: "",
      emotionValue3: "",
      emotionSentimentsArrs0: [],
      emotionSentimentsArrs1: [],
      emotionSentimentsArrs2: [],
      emotionSentimentsArrs3: [],
      saveSuccess0: false,
      saveSuccess1: false,
      saveSuccess2: false,
      saveSuccess3: false,
    };
  }

  handleSubmitPrompt = async (e) => {
    this.setState({
      generatedImgArr: "",
    });
    let reqbodyObj = { prompt: this.state.prompt };
    e.preventDefault();
    let config = {
      method: "post",
      baseURL: process.env.REACT_APP_SERVER,
      url: "/item/generate",
      data: reqbodyObj,
    };
    this.setState({
      stopSpinner: true,
      popOverShow: false,
      displayPopover0: false,
      displayPopover1: false,
      displayPopover2: false,
      displayPopover3: false,
      popOverShow0: false,
      popOverShow1: false,
      popOverShow2: false,
      popOverShow3: false,
      badWords: false,
    });
    let generatedImg = await axios(config);
    if (generatedImg.data !== true) {
      this.setState({
        generatedImgArr: generatedImg.data.data,
        img1Url: generatedImg.data.data[0].url,
        img2Url: generatedImg.data.data[1].url,
        img3Url: generatedImg.data.data[2].url,
        img4Url: generatedImg.data.data[3].url,
        stopSpinner: false,
        badWords: false,
      });
    } else {
      this.setState({
        badWords: true,
        stopSpinner: false,
      });
    }
  };

  getEmotion = async (x) => {
    let reqbodyObj = { url: this.state.generatedImgArr[x].url };
    const config = {
      method: "post",
      baseURL: process.env.REACT_APP_SERVER,
      url: "/item/emotion",
      data: reqbodyObj,
    };
    const emoteSpinners = `emotionSpinner${x}`;
    this.setState({
      [emoteSpinners]: true,
    });
    const emotions = await axios(config);
    const poppers = `emotionPopover${x}`;
    const displayPoppers = `displayPopover${x}`;
    const emotionValues = `emotionValue${x}`;
    const emotionSentimentsArrs = `emotionSentimentsArrs${x}`;
    this.setState({
      [emoteSpinners]: false,
    });
    if (emotions.data.length !== 0) {
      this.setState({
        [displayPoppers]: true,
        [poppers]: x,
        [emotionValues]: emotions.data[0].emotion.value,
        [emotionSentimentsArrs]: emotions.data[0].emotion.sentiments,
      });
    } else {
      const poppersFail = `popOverShow${x}`;
      this.setState({
        [poppersFail]: true,
      });
    }
  };

  savePrompt = async (idx) => {
    if (this.props.auth0.isAuthenticated) {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      let schemaObj = {
        prompt: this.state.prompt,
        userEmail: this.props.auth0.user.email,
        imgSrc: this.state.generatedImgArr[idx].url,
      };
      let config = {
        method: "post",
        baseURL: process.env.REACT_APP_SERVER,
        url: "/item",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        data: schemaObj,
      };
      try {
        const savers = `saveSuccess${idx}`;
        await axios(config);
        this.setState({
          [savers]: true,
        });
      } catch (err) {}
    }
  };

  handleFormChange = (e) => {
    this.setState({
      prompt: e.target.value,
    });
  };

  closeAlert = () => {
    this.setState({
      badWords: false,
    });
  };

  render() {
    return (
      <>
        <div handleSubmitPrompt={this.handleSubmitPrompt}></div>
        <div className="submit-container">
          <div className="drop">
            <InputForm
              className="inputBox"
              handleSubmitPrompt={this.handleSubmitPrompt}
              savePrompt={this.savePrompt}
              handleFormChange={this.handleFormChange}
              badWords={this.state.badWords}
              closeAlert={this.closeAlert}
            />
            <div className="loading">
              {this.state.stopSpinner && (
                <Spinner animation="grow" variant="dark" />
              )}
            </div>
          </div>
        </div>

        <div className="glassContainer">
          {this.state.img1Url && (
            <>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={800}>
                <Card className="glassCard">
                  <Card.Img
                    variant="top"
                    src={this.state.img1Url}
                    key={0}
                    alt="Generated with Dall-E 2"
                  />
                  <Card.Body className="cardBody">
                    {this.props.auth0.isAuthenticated && this.state.img1Url && (
                      <button
                        className="saveBtn"
                        variant="primary"
                        onClick={() => this.savePrompt(0)}
                      >
                        {this.state.saveSuccess0 ? (
                          <>Saved </>
                        ) : (
                          <>Save to Collection</>
                        )}
                      </button>
                    )}
                    {this.state.img1Url && (
                      <button
                        className="emoBtn"
                        onClick={() => this.getEmotion(0)}
                      >
                        Get Emotion
                      </button>
                    )}
                    {this.state.emotionSpinner0 && (
                      <Spinner animation="grow" variant="dark" />
                    )}
                    {this.state.displayPopover0 && (
                      <p className="emotionButton">
                        {this.state.emotionValue0}
                      </p>
                    )}
                    {this.state.popOverShow0 && (
                      <p className="emotionButton">Unable to get Emotion</p>
                    )}
                  </Card.Body>
                </Card>
              </Tilt>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={800}>
                <Card className="glassCard">
                  <Card.Img
                    variant="top"
                    src={this.state.img2Url}
                    key={1}
                    alt="Generated with Dall-E 2"
                  />
                  <Card.Body className="cardBody">
                    {this.props.auth0.isAuthenticated && this.state.img1Url && (
                      <button
                        className="saveBtn"
                        variant="primary"
                        onClick={() => this.savePrompt(1)}
                      >
                        {" "}
                        {this.state.saveSuccess1 ? (
                          <>Saved </>
                        ) : (
                          <>Save to Collection</>
                        )}{" "}
                      </button>
                    )}
                    {this.state.img1Url && (
                      <button
                        className="emoBtn"
                        onClick={() => this.getEmotion(1)}
                      >
                        Get Emotion
                      </button>
                    )}
                    {this.state.emotionSpinner1 && (
                      <Spinner animation="grow" variant="dark" />
                    )}
                    {this.state.displayPopover1 && (
                      <p className="emotionButton">
                        {this.state.emotionValue1}
                      </p>
                    )}
                    {this.state.popOverShow1 && (
                      <p className="emotionButton">Unable to get Emotion</p>
                    )}
                  </Card.Body>
                </Card>
              </Tilt>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={800}>
                <Card className="glassCard">
                  <Card.Img
                    variant="top"
                    src={this.state.img3Url}
                    key={2}
                    alt="Generated with Dall-E 2"
                  />
                  <Card.Body className="cardBody">
                    {this.props.auth0.isAuthenticated && this.state.img1Url && (
                      <button
                        className="saveBtn"
                        variant="primary"
                        onClick={() => this.savePrompt(2)}
                      >
                        {this.state.saveSuccess2 ? (
                          <>Saved </>
                        ) : (
                          <>Save to Collection</>
                        )}
                      </button>
                    )}
                    {this.state.img1Url && (
                      <button
                        className="emoBtn"
                        onClick={() => this.getEmotion(2)}
                      >
                        Get Emotion
                      </button>
                    )}
                    {this.state.emotionSpinner2 && (
                      <Spinner animation="grow" variant="dark" />
                    )}
                    {this.state.displayPopover2 && (
                      <p className="emotionButton">
                        {this.state.emotionValue2}
                      </p>
                    )}
                    {this.state.popOverShow2 && (
                      <p className="emotionButton">Unable to get Emotion</p>
                    )}
                  </Card.Body>
                </Card>
              </Tilt>
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={800}>
                <Card className="glassCard">
                  <Card.Img
                    variant="top"
                    src={this.state.img4Url}
                    key={3}
                    alt="Generated with Dall-E 2"
                  />
                  <Card.Body className="cardBody">
                    {this.props.auth0.isAuthenticated && this.state.img1Url && (
                      <button
                        className="saveBtn"
                        variant="primary"
                        onClick={() => this.savePrompt(3)}
                      >
                        {this.state.saveSuccess3 ? (
                          <>Saved </>
                        ) : (
                          <>Save to Collection</>
                        )}
                      </button>
                    )}
                    {this.state.img1Url && (
                      <button
                        className="emoBtn"
                        onClick={() => this.getEmotion(3)}
                      >
                        Get Emotion
                      </button>
                    )}
                    {this.state.emotionSpinner3 && (
                      <Spinner animation="grow" variant="dark" />
                    )}
                    {this.state.displayPopover3 && (
                      <p className="emotionButton">
                        {this.state.emotionValue3}
                      </p>
                    )}
                    {this.state.popOverShow3 && (
                      <p className="emotionButton">Unable to get Emotion</p>
                    )}
                  </Card.Body>
                </Card>
              </Tilt>
            </>
          )}
        </div>
      </>
    );
  }
}

export default withAuth0(Generate);
