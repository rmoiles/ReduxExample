'use strict';

var _todos = require('./todos');

var _todos2 = _interopRequireDefault(_todos);

var _ActionTypes = require('../constants/ActionTypes');

var types = _interopRequireWildcard(_ActionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('todos reducer', function () {
  it('should handle initial state', function () {
    expect((0, _todos2.default)(undefined, {})).toEqual([{
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle ADD_TODO', function () {
    expect((0, _todos2.default)([], {
      type: types.ADD_TODO,
      text: 'Run the tests'
    })).toEqual([{
      text: 'Run the tests',
      completed: false,
      id: 0
    }]);

    expect((0, _todos2.default)([{
      text: 'Use Redux',
      completed: false,
      id: 0
    }], {
      type: types.ADD_TODO,
      text: 'Run the tests'
    })).toEqual([{
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);

    expect((0, _todos2.default)([{
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }], {
      type: types.ADD_TODO,
      text: 'Fix the tests'
    })).toEqual([{
      text: 'Fix the tests',
      completed: false,
      id: 2
    }, {
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle DELETE_TODO', function () {
    expect((0, _todos2.default)([{
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }], {
      type: types.DELETE_TODO,
      id: 1
    })).toEqual([{
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle EDIT_TODO', function () {
    expect((0, _todos2.default)([{
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }], {
      type: types.EDIT_TODO,
      text: 'Fix the tests',
      id: 1
    })).toEqual([{
      text: 'Fix the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle COMPLETE_TODO', function () {
    expect((0, _todos2.default)([{
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }], {
      type: types.COMPLETE_TODO,
      id: 1
    })).toEqual([{
      text: 'Run the tests',
      completed: true,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle COMPLETE_ALL', function () {
    expect((0, _todos2.default)([{
      text: 'Run the tests',
      completed: true,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }], {
      type: types.COMPLETE_ALL
    })).toEqual([{
      text: 'Run the tests',
      completed: true,
      id: 1
    }, {
      text: 'Use Redux',
      completed: true,
      id: 0
    }]);

    // Unmark if all todos are currently completed
    expect((0, _todos2.default)([{
      text: 'Run the tests',
      completed: true,
      id: 1
    }, {
      text: 'Use Redux',
      completed: true,
      id: 0
    }], {
      type: types.COMPLETE_ALL
    })).toEqual([{
      text: 'Run the tests',
      completed: false,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should handle CLEAR_COMPLETED', function () {
    expect((0, _todos2.default)([{
      text: 'Run the tests',
      completed: true,
      id: 1
    }, {
      text: 'Use Redux',
      completed: false,
      id: 0
    }], {
      type: types.CLEAR_COMPLETED
    })).toEqual([{
      text: 'Use Redux',
      completed: false,
      id: 0
    }]);
  });

  it('should not generate duplicate ids after CLEAR_COMPLETED', function () {
    expect([{
      type: types.COMPLETE_TODO,
      id: 0
    }, {
      type: types.CLEAR_COMPLETED
    }, {
      type: types.ADD_TODO,
      text: 'Write more tests'
    }].reduce(_todos2.default, [{
      id: 0,
      completed: false,
      text: 'Use Redux'
    }, {
      id: 1,
      completed: false,
      text: 'Write tests'
    }])).toEqual([{
      text: 'Write more tests',
      completed: false,
      id: 2
    }, {
      text: 'Write tests',
      completed: false,
      id: 1
    }]);
  });
});