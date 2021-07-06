// Importamos los tipos de acciones
import types from '../actions/types';

// Estado inicial
const initialState = {
  list: []
}

// Implementamos el reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    // Agregar una nota
    case types.ADD_NOTE:
      return {
        list: [
          ...state.list, {
          note:  action.note
          }
        ]
      };
    case types.UPDATE_NOTE:
      return {
        list: [
          ...state.list.slice(0, action.index),
          {
            ...state.list[action.index],
            note: action.note,
          },
          ...state.list.slice(action.index + 1)
        ]
      };
    case types.DELETE_NOTE:
      return {
        list: [  
          ...state.list.slice(0, action.index),
          ...state.list.slice(action.index + 1)
        ]
      };
    default:
      return state;
  }
}

export default reducer;
