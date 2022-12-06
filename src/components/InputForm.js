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
          <div className="glass">
            <Button onClick={() => this.setState({ empty: false })} variant="outline-success">
              Close
            </Button>
          </div>
        </Alert>
        <Alert variant="danger" show={this.props.badWords} >
          <p className='bad'>
            No bad words!
          </p>   
            <Button onClick={() => this.props.closeAlert()} variant="danger">
              Close
            </Button>
        </Alert>
      </div>
    )
  }
}

export default InputForm;
