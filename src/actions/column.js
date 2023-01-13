import { ADD_COLUMN, REMOVE_COLUMN } from "./types";
import * as _ from "radash";

const addColumn = (column) => (dispatch) => {
  const id = _.uid(6);
  dispatch({
    type: ADD_COLUMN,
    payload: { column, id },
  });
};

const removeColumn = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_COLUMN,
    payload: id,
  });
};

export { addColumn, removeColumn };
