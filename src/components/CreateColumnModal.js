import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { addColumn } from "../actions/column";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const CreateColumnModal = ({ show, onHide, addColumn }) => {
  const [formData, setFormData] = useState({
    column: "",
  });

  const { column } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    addColumn(column);
    onHide();
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                name="column"
                value={column}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="secondary" onClick={onHide}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

CreateColumnModal.prototype = {
  addColumn: PropTypes.func.isRequired,
};

export default connect(null, { addColumn })(CreateColumnModal);
