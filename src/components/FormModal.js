import React from 'react';
import { Button, Modal, Form} from 'react-bootstrap';

class FormModal extends React.Component {
  render() {
    return (
      <>
        <Modal
          show={this.props.isModalShown}
          onHide={this.props.handleCloseModal}
        >
          <Form onSubmit={this.props.handleEditItem}>
            <Form.Group controlId='prompt'>
              <Form.Label>Prompt</Form.Label>
              <Form.Control type="text" placeholder={this.props.itemToChange.prompt}/>
            </Form.Group>
            <Button type="submit" onClick={this.props.handleCloseModal}>Submit Changes</Button>
          </Form>
          <Button onClick={this.props.handleCloseModal}>Cancel</Button>
        </Modal>
      </>
    )
  }
}


export default FormModal;
