import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibility';

/*
 field on left (ex. todos: todos), will match the final state field it manages
 the value on the right is the reducer to be called
 if the key and value match, they can be dropped
 the result of combineReducers() is a parent reducer that
 contains a field for each child reducer and its resulting state
*/
const rootReducer = combineReducers({
  todos,
  visibilityFilter,
});

export default rootReducer;
