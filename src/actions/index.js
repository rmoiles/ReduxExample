import * as types from '../constants/ActionTypes';

export const openTodoJSON = id => ({ type: types.OPEN_TODO, id });
export const closeTodoJSON = () => ({ type: types.CLOSE_TODO });
export const addTodoJSON = text => ({ type: types.ADD_TODO, text });
export const deleteTodoJSON = id => ({ type: types.DELETE_TODO, id });
export const updateTodoJSON = (id, text) => ({ type: types.UPDATE_TODO, id, text });
export const completeTodoJSON = id => ({ type: types.COMPLETE_TODO, id });
export const completeAllJSON = () => ({ type: types.COMPLETE_ALL });
export const clearCompletedJSON = () => ({ type: types.CLEAR_COMPLETED });
export const filterListTodoJSON = filter => (
    { type: types.SET_VISIBILITY_FILTER, filter }
  );
