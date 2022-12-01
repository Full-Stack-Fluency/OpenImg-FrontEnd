import React from 'react';
import { Form, Button } from 'react-bootstrap';


class InputForm extends React.Component {
    render() {
        return (

            <Form onSubmit={this.props.handleSubmitPrompt}>
                <Form.Group controlId='prompt'>
                    <Form.Label>Prompt</Form.Label>
                    <Form.Control type="text" placeholder="type whatever type of image you want to see" />
                </Form.Group>
                <Button type="submit">Generate Image</Button>
            </Form>
        )
    }
}

export default InputForm;