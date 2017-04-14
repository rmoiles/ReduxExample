'use strict';

var _redux = require('redux');

var _TodoFilters = require('./constants/TodoFilters');

var filters = _interopRequireWildcard(_TodoFilters);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import * as types from './constants/ActionTypes';

// import * as utils from './utils/utils';
var store = (0, _redux.createStore)(_reducers2.default);

var logState = function logState() {
  kony.print('New state:', appUtils.getStore().getState());
};

/*
* Filters out the todos that don't match the filter.
* @param {Array} todos
* @param {String} filter
* @return {Array} An array of todos that match the filter.
*/
var getVisibileTodos = function getVisibileTodos(todos, filter) {
  switch (filter) {
    case filters.SHOW_COMPLETED:
      return todos.filter(function (t) {
        return t.completed;
      });
    case filters.SHOW_ACTIVE:
      return todos.filter(function (t) {
        return !t.completed;
      });
    default:
      return todos;
  }
};

// an array of open todos
var getOpenTodo = function getOpenTodo(todos) {
  return todos.filter(function (t) {
    return t.open;
  });
};

var appUtil = {
  SHOW_ALL: filters.SHOW_ALL,
  SHOW_COMPLETED: filters.SHOW_COMPLETED,
  SHOW_ACTIVE: filters.SHOW_ACTIVE,
  getStore: function getStore() {
    return store;
  },

  /*
   * Opens the Todo matching the ID.  If successful, executes callback.
   * @param {String} id, unique id of Todo
   * @param {Function} callback, passed in function to execute on success
  */
  openToDo: function openToDo(id, showUpdate) {
    store.dispatch((0, _actions.openTodoJSON)(id));
    showUpdate();
  },
  closeToDo: function closeToDo() {
    store.dispatch((0, _actions.closeTodoJSON)());
  },
  addToDo: function addToDo() {
    store.dispatch((0, _actions.addTodoJSON)());
  },
  deleteToDo: function deleteToDo(id) {
    store.dispatch((0, _actions.deleteTodoJSON)(id));
  },
  updateToDo: function updateToDo(id) {
    store.dispatch((0, _actions.updateTodoJSON)(id));
  },
  completeToDo: function completeToDo(id) {
    store.dispatch((0, _actions.completeTodoJSON)(id));
  },
  completeAllToDos: function completeAllToDos() {
    store.dispatch((0, _actions.completeAllJSON)());
  },
  openAllToDos: function openAllToDos() {
    store.dispatch((0, _actions.clearCompletedJSON)());
  },

  // filters the ToDo List ex. appUtils.SHOW_ALL
  filterTodoList: function filterTodoList(filter) {
    kony.print('@@@@ filterTodoList(filter): ', filter);
    store.dispatch((0, _actions.filterListTodoJSON)(filter));
  },

  /*
   * Called on init of frmToToList Form, which is the default form.
   * The state is defaulting the databased on this assumption.
  */
  render: function render() {
    frmToDoList.segTodos.widgetDataMap = { lblTitle: 'text', lblStatus: 'completed', lblTodoId: 'id' };
    frmToDoList.segTodos.setData(getVisibileTodos(store.getState().todos, store.getState().visibilityFilter));

    var theOpenTodo = getOpenTodo(store.getState().todos);
    kony.print('$$$$ theOpenTodo: ', theOpenTodo);
    if (typeof theOpenTodo[0] !== 'undefined') {
      frmToDoList.txtEditTitle.text = theOpenTodo[0].text;
      frmToDoList.lblEditId.text = theOpenTodo[0].id;
    } else {
      frmToDoList.txtEditTitle.text = '';
      frmToDoList.lblEditId.text = '';
    }
  }
};

// import utils is required to make it accessible by app.js
// which is the entry point.  Now we can set it to an undefinded
// var, appUtils, which should be defined in Kony app.  This
// will make everything in utils.js accessible to kony code.
appUtils = appUtil;

appUtil.getStore().subscribe(logState);
appUtil.getStore().subscribe(appUtil.render);