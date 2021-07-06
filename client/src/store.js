import { createStore,combineReducers } from "redux";

// Reducers
import notas from "./reducers/notas";

export default createStore(combineReducers({
    notas
  }));
