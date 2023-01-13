import React, { useMemo, useState, useRef } from "react";
import { styled } from "@stitches/react";
import { Draggable } from "../primitives";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-modal-video/scss/modal-video.scss";
import { connect } from "react-redux";
import { removeCard } from "../actions/card";
import PropTypes from "prop-types";

const DraggableComponent = ({
  identifier,
  content,
  title,
  handleClick,
  handleShow,
  id,
  handleEdit,
  removeCard,
}) => {
  const itemIdentifier = useMemo(() => identifier, [identifier]);
  const onClick = () => {
    handleShow();
    handleEdit(id);
  };
  const handleDelete = () => {
    removeCard(id);
  };

  return (
    <Card style={{ width: "18rem", marginBottom: "10px" }}>
      <Draggable id={itemIdentifier}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Draggable>
      <ElementWrapper>
        <Button
          variant="outline-secondary"
          onClick={() => {
            onClick();
          }}
        >
          Edit
        </Button>
        <Button
          size="lg"
          onClick={() => handleClick(id)}
          style={{ background: "#5800FF" }}
        >
          Play
        </Button>

        <Button
          variant="outline-danger"
          size="lg"
          onClick={() => handleDelete(id)}
        >
          Delete
        </Button>
      </ElementWrapper>
    </Card>
  );
};

const ElementWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  margin: "10px",
});

const ElementText = styled("h3", {
  fontSize: 18,
  fontWeight: 600,
});

DraggableComponent.propTypes = {
  removeCard: PropTypes.func.isRequired,
};

export default connect(null, { removeCard })(DraggableComponent);
