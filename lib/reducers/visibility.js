'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = visibilityFilter;

var _ActionTypes = require('../constants/ActionTypes');

var _TodoFilters = require('../constants/TodoFilters');

function visibilityFilter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _TodoFilters.SHOW_ALL;
  var action = arguments[1];

  switch (action.type) {
    case _ActionTypes.SET_VISIBILITY_FILTER:
      return action.filter;

    default:
      return state;
  }
}