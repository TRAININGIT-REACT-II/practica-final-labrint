import types from './types';

export const addNote = (note) => ({
  type: types.ADD_NOTE,
  note
});

export const updateNote = (index,note) => ({
  type: types.UPDATE_NOTE,
  index,
  note
});

export const deleteNote = (index) => ({
  type: types.DELETE_NOTE,
  index
});
