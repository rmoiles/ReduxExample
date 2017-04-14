'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _todos = require('./todos');

var _todos2 = _interopRequireDefault(_todos);

var _visibility = require('./visibility');

var _visibility2 = _interopRequireDefault(_visibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 field on left (ex. todos: todos), will match the final state field it manages
 the value on the right is the reducer to be called
 if the key and value match, they can be dropped
 the result of combineReducers() is a parent reducer that
 contains a field for each child reducer and its resulting state
*/
var rootReducer = (0, _redux.combineReducers)({
  todos: _todos2.default,
  visibilityFilter: _visibility2.default
});

exports.default = rootReducer;