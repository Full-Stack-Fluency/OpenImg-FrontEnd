import React from 'react';
import { Form, Popover } from 'react-bootstrap';
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
                <Form.Group controlId='prompt'>
                    <Form.Label className="OpenImg-Prompt">
                      <img className="logo" src="/images/openImg.png" alt="" /></Form.Label>
                    <Form.Control className="theBox" type="text" placeholder="Type to generate image" onChange={this.props.handleFormChange} />
                </Form.Group>
                <div className="buttonGen">
                <button className="imgGenerator" type="submit">Image Generation</button>
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
                {this.props.promptFlagged && 
                    <Popover id = "flaggedPopover">
                        <Popover.Header as="h3">
                            Prompt Flagged
                        </Popover.Header>
                        <Popover.Body>
                            Requests need to be school friendly
                        </Popover.Body>
                    </Popover>
                }
                
                </div>
            </Form>
        )
    }
  }

export default InputForm;
