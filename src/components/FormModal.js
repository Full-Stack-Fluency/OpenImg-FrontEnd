import React from 'react';
import { Modal, Form, Popover } from 'react-bootstrap';
import './FormModal.css';

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
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
          show={this.props.isModalShown}
          onHide={this.props.handleCloseModal}

        >
          <Form className="modalForm" onSubmit={this.handleRequireInputToGenerate}>
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
              <Form.Label>Input new prompt</Form.Label>
              <Form.Control type="text" placeholder={this.props.itemToChange.prompt} />
            </Form.Group>
            <button className="modalButton" type="submit">Submit Changes</button>
            <button className="modalButton" onClick={this.props.handleCloseModal}>Cancel</button>
          </Form>
        </Modal>
      </>
    )
  }
}


export default FormModal;
