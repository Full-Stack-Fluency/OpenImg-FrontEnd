import React from 'react';
import { Form, Button, Popover } from 'react-bootstrap';
import './InputForm.css';

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          popoverDisplay: false
        }
      }
    handleRequireInputToGenerate = e => {
        if (e) e.preventDefault();
        if (e.target.prompt.value !== '') {
          this.props.handleSubmitPrompt(e);
          this.setState({
            popoverDisplay: false
          })
        } else { 
          this.setState({
            popoverDisplay: true
          })
        }
      }

    render() {
        return (

            <Form onSubmit={this.handleRequireInputToGenerate}>
                {this.state.popoverDisplay && 
                    <Popover id = "error message for form not submit correctly">
                        <Popover.Header as="h3">
                            Prompt Required
                        </Popover.Header>
                        <Popover.Body>
                            Fill in form before you click Image Generation
                        </Popover.Body>
                    </Popover>
                }
                <Form.Group controlId='prompt'>
                    <Form.Label className="OpenImg-Prompt">OpenImg</Form.Label>
                    <Form.Control type="text" placeholder="Type to generate image" onChange={this.props.handleFormChange} />
                </Form.Group>
                <div className="buttonGen">
                <Button variant="success" className="imgGenerator" type="submit">A.I. Image Generation</Button>
                </div>
            </Form>
        )
    }
  }

export default InputForm;
