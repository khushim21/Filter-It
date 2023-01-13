import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { styled } from "@stitches/react";
import Column from "./components/Column";
import "react-modal-video/scss/modal-video.scss";
import ModalVideo from "react-modal-video";
import EditModal from "./components/EditModal";
import CreateModal from "./components/CreateModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { columnUpdate } from "./actions/card";
import getVideoId from "get-video-id";
import { moveToHistory } from "./actions/card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateColumnModal from "./components/CreateColumnModal";

const App = ({ card, column, columnUpdate, moveToHistory }) => {
  const [videoModal, setVideoModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [cardToBeEdited, setCardToBeEdited] = useState();
  const [heading, setHeading] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [addColumn, setAddColumn] = useState(false);

  const handleClick = (idd) => {
    const reqCard = card.filter((card) => card.id === idd);
    const url = reqCard[0].link;
    const { id } = getVideoId(url);
    setVideoUrl(id);
    setVideoModal(true);
    moveToHistory(idd);
  };
  const handleEdit = (id) => setCardToBeEdited(id);
  const handleClose = () => setEditModal(false);
  const handleShow = () => setEditModal(true);

  const handleColumnClose = () => setAddColumn(false);
  const handleColumnShow = () => setAddColumn(true);

  const handleCreateClose = () => setCreateModal(false);
  const handleCreateShow = (head) => {
    setHeading(head);
    setCreateModal(true);
  };

  const handleOnDragEnd = ({ active, over }) => {
    const elementId = active.id;

    card.map((elm) => {
      if (elm.id === elementId) {
        const column = over?.id ? String(over.id) : elm.column;
        columnUpdate(elementId, column);
      }
    });
  };

  return (
    <>
      <div>
        <DndContext onDragEnd={handleOnDragEnd}>
          <MainWrapper>
            {column.map((column, columnIndex) => (
              <Column
                key={`column-${columnIndex}`}
                heading={column.column}
                handleClick={handleClick}
                handleShow={handleShow}
                handleCreateShow={handleCreateShow}
                handleEdit={handleEdit}
                columnId={column.id}
              />
            ))}
          </MainWrapper>
        </DndContext>
        <ModalVideo
          channel="youtube"
          isOpen={videoModal}
          videoId={videoUrl}
          onClose={() => setVideoModal(false)}
        />
        <EditModal show={editModal} onHide={handleClose} id={cardToBeEdited} />
        <CreateModal
          show={createModal}
          onHide={handleCreateClose}
          headingName={heading}
        />
        <CreateColumnModal show={addColumn} onHide={handleColumnClose} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outline-primary" size="lg" onClick={handleColumnShow}>
          Add Category
        </Button>
      </div>
    </>
  );
};

const MainWrapper = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
  backgroundColor: "#fff",
  paddingTop: 40,
  paddingBottom: 40,
  height: "90vh",
});

App.propTypes = {
  card: PropTypes.array.isRequired,
  column: PropTypes.array.isRequired,
  columnUpdate: PropTypes.func.isRequired,
  moveToHistory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  card: state.card,
  column: state.column,
});

export default connect(mapStateToProps, { columnUpdate, moveToHistory })(App);
