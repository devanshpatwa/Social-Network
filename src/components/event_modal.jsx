import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import firebase from "firebase";

class Event_Modal extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Event Name: {localStorage.getItem("eventName")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h3>Successfully Booked</h3>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Event_Modal;
