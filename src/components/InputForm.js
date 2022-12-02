import React from 'react';
import { Form, Button,Popover } from 'react-bootstrap';


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
                            cmon bruh at least fill it out before you spam click
                        </Popover.Body>
                    </Popover>
                }
                <Form.Group controlId='prompt'>
                    <Form.Label>Prompt</Form.Label>
                    <Form.Control type="text" placeholder="type whatever type of image you want to see" onChange={this.props.handleFormChange} />
                </Form.Group>
                <Button type="submit">Generate Image</Button>
            </Form>
        )
    }
}

export default InputForm;