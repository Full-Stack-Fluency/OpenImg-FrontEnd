import React from 'react';
import { Modal, Form, Alert,Button } from 'react-bootstrap';
import './FormModal.css';

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: false
    }
  }

  handleRequireInputToGenerate = e => {
    e.preventDefault();
    if (e) e.preventDefault();
    if (e.target.prompt.value !== '') {
      this.props.handleEditItem(e, this.props.itemToChange);
      this.props.handleCloseModal();
      this.setState({
        empty:false
      })
    } else {
      this.setState({
        empty:true
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
