import React from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import './InputForm.css';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: false,
    }
  }

  handleRequireInputToGenerate = (e) => {
    if (e) e.preventDefault();
    if (e.target.prompt.value === '') {
      this.setState({
        empty: true
      })
    } else {
      this.props.handleSubmitPrompt(e);
    }
  }

  render() {

    return (
      <div className="input">
        <Form onSubmit={this.handleRequireInputToGenerate}>
          <Form.Group controlId='prompt'>
            <Form.Label className="OpenImg-Prompt">
              <img className="logo" src="/images/openImg.png" alt="" /></Form.Label>
            <Form.Control className="theBox" type="text" placeholder="Type to generate image" onChange={this.props.handleFormChange} />
          </Form.Group>
          <div className="buttonGen">
            <button className="imgGenerator" type="submit">Image Generation</button>
          </div>
        </Form>
        <Alert className="alert" show={this.state.empty} >
          <p>
            Please enter a prompt
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => this.setState({ empty: false })} variant="outline-success">
              Close
            </Button>
          </div>
        </Alert>
        <Alert className="alert" show={this.props.badWords} >
          <p>
            No bad words!
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => this.props.closeAlert()} variant="outline-success">
              Close
            </Button>
          </div>
        </Alert>
      </div>
    )
  }
}

export default InputForm;
