import React from "react";
import { Modal, Form, Alert } from "react-bootstrap";

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noInput: false,
    };
  }

  handleRequireInputToGenerate = (e) => {
    e.preventDefault();
    if (e.target.prompt.value !== "") {
      this.props.handleEditItem(e, this.props.itemToChange);
      this.props.handleCloseModal();
      this.setState({
        noInput: false,
      });
    } else {
      this.setState({
        noInput: true,
      });
    }
  };

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
          <Form
            className="modalForm"
            onSubmit={this.handleRequireInputToGenerate}
          >
            <Alert className="alert" variant="danger" show={this.state.noInput}>
              <p>A prompt is required.</p>
            </Alert>
            <Form.Group controlId="prompt">
              <Form.Label>Input new prompt</Form.Label>
              <Form.Control
                type="text"
                placeholder={this.props.itemToChange.prompt}
              />
            </Form.Group>
            <button className="modalButton2" type="submit">
              Submit Changes
            </button>
            <button
              className="modalButton2"
              onClick={this.props.handleCloseModal}
            >
              Cancel
            </button>
          </Form>
        </Modal>
      </>
    );
  }
}

export default FormModal;
