'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = todos;

var _ActionTypes = require('../constants/ActionTypes');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
  Using the reducer composition pattern letting different reducers handle
  different parts of the state tree and combine their results
*/
var initialState = [{
  text: 'Use Redux',
  completed: false,
  id: 0,
  open: false
}];
// reduce() runs for every iteration
// in this case, get max number using current_iter.id and the previous max number
// the -1 (second param) initializez maxId.  todo contains the current iteration
// finally, it adds +1 to the returned maxId to be the id of the new todo

// filter() iterates for ever value and returns a new array of those that return true
// in this case, it removes the one todo that should be deleted

// every() tests if every array element passes the test

// ** todo manages the individual records and only called fromm todos()
var todo = function todo(state, action) {
  switch (action.type) {
    case _ActionTypes.ADD_TODO:
      return {
        id: state.id + 1,
        completed: false,
        text: action.text,
        open: false
      };

    case _ActionTypes.OPEN_TODO:
      if (state.id !== action.id) {
        return _extends({}, state, {
          open: false
        });
      }
      return _extends({}, state, {
        open: true
      });

    case _ActionTypes.CLOSE_TODO:
      return _extends({}, state, {
        open: false
      });

    case _ActionTypes.UPDATE_TODO:
      if (state.id !== action.id) {
        return state;
      }
      return _extends({}, state, {
        text: action.text,
        open: false
      });

    case _ActionTypes.COMPLETE_TODO:
      if (state.id !== action.id) {
        return state;
      }
      return _extends({}, state, {
        completed: !state.completed
      });

    case _ActionTypes.COMPLETE_ALL:
      return _extends({}, state, {
        completed: true
      });
    default:
      return state;
  }
};

// spread ... literally just spreads out the array values, crazy
// in redux, state should not be mutated! always create a new array/state (...spread helps)
function todos() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes.ADD_TODO:
      return [].concat(_toConsumableArray(state), [todo({ id: state.reduce(function (maxId, t) {
          return Math.max(t.id, maxId);
        }, -1) }, action)]);

    case _ActionTypes.OPEN_TODO:
      return state.map(function (t) {
        return todo(t, action);
      });

    case _ActionTypes.CLOSE_TODO:
      return state.map(function (t) {
        return todo(t, action);
      });

    case _ActionTypes.DELETE_TODO:
      return state.filter(function (t) {
        return t.id !== action.id;
      });

    case _ActionTypes.UPDATE_TODO:
      // maps raw data to new fieds; iterates for ever value translating fields
      // in this case, if the record to be edited is matched, set the "text" field to the new value
      // this would be like a save; the user is saying what the new value should be

      // using spread here; the current iteration, todo, is an array of fields
      // the spread here just returns the existing values of the current iteration then modifies it
      return state.map(function (t) {
        return todo(t, action);
      });

    case _ActionTypes.COMPLETE_TODO:
      return state.map(function (t) {
        return todo(t, action);
      });

    case _ActionTypes.COMPLETE_ALL:
      //  const areAllMarked = state.every(todo => todo.completed)
      return state.map(function (t) {
        return todo(t, action);
      });

    case _ActionTypes.CLEAR_COMPLETED:
      return state.filter(function (t) {
        return t.completed === false;
      });

    default:
      return state;
  }
}