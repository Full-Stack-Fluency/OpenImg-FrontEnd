import React from 'react';
import { Button, Modal, Form, Popover } from 'react-bootstrap';

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverDisplay: false
    }
  }

  handleRequireInputToGenerate = e => {
    e.preventDefault();
    if (e) e.preventDefault();
    if (e.target.prompt.value !== '') {
      this.props.handleEditItem(e, this.props.itemToChange);
      this.props.handleCloseModal();
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
      <>
        <Modal
          show={this.props.isModalShown}
          onHide={this.props.handleCloseModal}
        >
          <Form onSubmit={this.handleRequireInputToGenerate}>
            {this.state.popoverDisplay &&
              <Popover id="error message for form not submit correctly">
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
              <Form.Control type="text" placeholder={this.props.itemToChange.prompt} />
            </Form.Group>
            <Button type="submit">Submit Changes</Button>
          </Form>
          <Button onClick={this.props.handleCloseModal}>Cancel</Button>
        </Modal>
      </>
    )
  }
}


export default FormModal;
