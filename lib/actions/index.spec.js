'use strict';

var _ActionTypes = require('../constants/ActionTypes');

var types = _interopRequireWildcard(_ActionTypes);

var _index = require('./index');

var actions = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe('todo actions', function () {
  it('addTodo should create ADD_TODO action', function () {
    expect(actions.addTodo('Use Redux')).toEqual({
      type: types.ADD_TODO,
      text: 'Use Redux'
    });
  });

  it('deleteTodo should create DELETE_TODO action', function () {
    expect(actions.deleteTodo(1)).toEqual({
      type: types.DELETE_TODO,
      id: 1
    });
  });

  it('editTodo should create EDIT_TODO action', function () {
    expect(actions.editTodo(1, 'Use Redux everywhere')).toEqual({
      type: types.EDIT_TODO,
      id: 1,
      text: 'Use Redux everywhere'
    });
  });

  it('completeTodo should create COMPLETE_TODO action', function () {
    expect(actions.completeTodo(1)).toEqual({
      type: types.COMPLETE_TODO,
      id: 1
    });
  });

  it('completeAll should create COMPLETE_ALL action', function () {
    expect(actions.completeAll()).toEqual({
      type: types.COMPLETE_ALL
    });
  });

  it('clearCompleted should create CLEAR_COMPLETED action', function () {
    expect(actions.clearCompleted()).toEqual({
      type: types.CLEAR_COMPLETED
    });
  });
});