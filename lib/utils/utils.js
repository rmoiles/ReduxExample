'use strict';

var _redux = require('redux');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _actions = require('../actions');

var _TodoFilters = require('../constants/TodoFilters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_reducers2.default);

var getVisibileTodos = function getVisibileTodos(todos, filter) {
  switch (filter) {
    case _TodoFilters.SHOW_COMPLETED:
      return todos.filter(function (t) {
        return t.completed;
      });
    case _TodoFilters.SHOW_ACTIVE:
      return todos.filter(function (t) {
        return !t.completed;
      });
    default:
      return todos;
  }
};

module.exports = {
  getStore: function getStore() {
    return store;
  },

  // filters the ToDo List ex. appUtils.SHOW_ALL
  filterTodoList: function filterTodoList(filter) {
    store.dispatch((0, _actions.filterListTodoJSON)(filter));
  },

  /*
   * Called on init of frmToToList Form, which is the default form.
   * The state is defaulting the databased on this assumption.
  */
  renderTodoList: function renderTodoList() {
    frmToDoList.segTodos.widgetDataMap = { lblTitle: 'text', lblStatus: 'completed', lblTodoId: 'id' };
    frmToDoList.segTodos.setData(getVisibileTodos(store.getState().todos, store.getState().visibilityFilter));
  }
};