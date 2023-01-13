import {
  ADD_CARD,
  REMOVE_CARD,
  EDIT_CARD,
  COLUMN_UPDATE,
  MOVE_TO_HISTORY,
} from "../actions/types";
const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_CARD:
      return [...state, payload];
    case REMOVE_CARD:
      return state.filter((card) => card.id !== payload);
    case EDIT_CARD:
      const notReqCard = state.filter((card) => card.id !== payload.id);
      const reqCard = state.filter((card) => card.id === payload.id);
      const elememtToPush = reqCard[0];
      elememtToPush.title = payload.title;
      elememtToPush.link = payload.link;
      elememtToPush.description = payload.description;
      return [...notReqCard, elememtToPush];
    case COLUMN_UPDATE:
      const noActiveCard = state.filter((card) => card.id !== payload.eleId);
      const Card = state.filter((card) => card.id === payload.eleId);
      const activeCard = Card[0];
      activeCard.column = payload.colId;
      return [...noActiveCard, activeCard];
    case MOVE_TO_HISTORY:
      const notReqHistoryCard = state.filter((card) => card.id !== payload);
      const reqHistoryCard = state.filter((card) => card.id === payload);
      const history = reqHistoryCard[0];
      history.column = "history";
      return [...notReqHistoryCard, history];
    default:
      return state;
  }
}
