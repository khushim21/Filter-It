import {
  ADD_CARD,
  REMOVE_CARD,
  EDIT_CARD,
  COLUMN_UPDATE,
  MOVE_TO_HISTORY,
} from "./types";
import * as _ from "radash";

const addCard = (formData) => (dispatch) => {
  const id = _.uid(6);
  formData.id = id;
  dispatch({
    type: ADD_CARD,
    payload: formData,
  });
};

const removeCard = (id) => (dispatch) => {
  dispatch({ type: REMOVE_CARD, payload: id });
};

const editCard = (formData) => (dispatch) => {
  dispatch({ type: EDIT_CARD, payload: formData });
};

const columnUpdate = (eleId, colId) => (dispatch) => {
  dispatch({ type: COLUMN_UPDATE, payload: { eleId, colId } });
};
const moveToHistory = (id) => (dispatch) => {
  dispatch({ type: MOVE_TO_HISTORY, payload: id });
};

export { addCard, removeCard, editCard, columnUpdate, moveToHistory };
