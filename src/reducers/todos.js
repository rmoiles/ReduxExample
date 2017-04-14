import { OPEN_TODO, CLOSE_TODO, ADD_TODO, DELETE_TODO, UPDATE_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes';

/*
  Using the reducer composition pattern letting different reducers handle
  different parts of the state tree and combine their results
*/
const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0,
    open: false,
  },
];
      // reduce() runs for every iteration
      // in this case, get max number using current_iter.id and the previous max number
      // the -1 (second param) initializez maxId.  todo contains the current iteration
      // finally, it adds +1 to the returned maxId to be the id of the new todo

      // filter() iterates for ever value and returns a new array of those that return true
      // in this case, it removes the one todo that should be deleted

      // every() tests if every array element passes the test

// ** todo manages the individual records and only called fromm todos()
const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: state.id + 1,
        completed: false,
        text: action.text,
        open: false,
      };

    case OPEN_TODO:
      if (state.id !== action.id) {
        return {
          ...state,
          open: false,
        };
      }
      return {
        ...state,
        open: true,
      };

    case CLOSE_TODO:
      return {
        ...state,
        open: false,
      };

    case UPDATE_TODO:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        text: action.text,
        open: false,
      };

    case COMPLETE_TODO:
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed,
      };

    case COMPLETE_ALL:
      return {
        ...state,
        completed: true,
      };
    default:
      return state;
  }
};

// spread ... literally just spreads out the array values, crazy
// in redux, state should not be mutated! always create a new array/state (...spread helps)
export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo({ id: state.reduce((maxId, t) => Math.max(t.id, maxId), -1) }, action),
      ];

    case OPEN_TODO:
      return state.map(t => todo(t, action));

    case CLOSE_TODO:
      return state.map(t => todo(t, action));

    case DELETE_TODO:
      return state.filter(t => t.id !== action.id);

    case UPDATE_TODO:
      // maps raw data to new fieds; iterates for ever value translating fields
      // in this case, if the record to be edited is matched, set the "text" field to the new value
      // this would be like a save; the user is saying what the new value should be

      // using spread here; the current iteration, todo, is an array of fields
      // the spread here just returns the existing values of the current iteration then modifies it
      return state.map(t => todo(t, action));

    case COMPLETE_TODO:
      return state.map(t => todo(t, action));

    case COMPLETE_ALL:
      //  const areAllMarked = state.every(todo => todo.completed)
      return state.map(t => todo(t, action));

    case CLEAR_COMPLETED:
      return state.filter(t => t.completed === false);

    default:
      return state;
  }
}
