import { ADD_COLUMN, REMOVE_COLUMN } from "../actions/types";
const initialState = [{ column: "History", id: "0kf8F7" }];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_COLUMN:
      console.log(payload);
      return [...state, payload];
    case REMOVE_COLUMN:
      return state.filter((column) => column.id !== payload);
    default:
      return state;
  }
}
