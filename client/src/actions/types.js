// Definimos la lista de acciones
const actions = [
  "ADD_NOTE",
  "UPDATE_NOTE",
  "DELETE_NOTE"
];

// Las convertimos en un objeto
const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;
