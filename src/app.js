import { createStore } from 'redux';
import * as filters from './constants/TodoFilters';
// import * as utils from './utils/utils';
import reducer from './reducers';
import { filterListTodoJSON, openTodoJSON, completeTodoJSON,
  closeTodoJSON, deleteTodoJSON, addTodoJSON, updateTodoJSON,
  completeAllJSON, clearCompletedJSON } from './actions';
// import * as types from './constants/ActionTypes';


/*
* render() works great for a single form.  For multiple forms,
* individual formRender() functions should be created.  These
* should be subsribed to but only run based on the state.  The
* state should contain a boolean for each form
* i.e. {showLoginForm: true, showOtherForm: false}.  Each render
* function would know about their form, how to populate it and
* ultimately showing the form.
*/


const store = createStore(reducer);

const logState = () => {
  kony.print('New state:', appUtils.getStore().getState());
};

/*
* Filters out the todos that don't match the filter.
* @param {Array} todos
* @param {String} filter
* @return {Array} An array of todos that match the filter.
*/
const getVisibileTodos = (todos, filter) => {
  switch (filter) {
    case filters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case filters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};

// an array of open todos
const getOpenTodo = todos => todos.filter(t => t.open);

const appUtil = {
  SHOW_ALL: filters.SHOW_ALL,
  SHOW_COMPLETED: filters.SHOW_COMPLETED,
  SHOW_ACTIVE: filters.SHOW_ACTIVE,
  getStore() {
    return store;
  },
  /*
   * Opens the Todo matching the ID.  If successful, executes callback.
   * @param {String} id, unique id of Todo
   * @param {Function} callback, passed in function to execute on success
  */
  openToDo(id, showUpdate) {
    store.dispatch(openTodoJSON(id));
    showUpdate();
  },
  closeToDo() {
    store.dispatch(closeTodoJSON());
  },
  addToDo() {
    store.dispatch(addTodoJSON());
  },
  deleteToDo(id) {
    store.dispatch(deleteTodoJSON(id));
  },
  updateToDo(id) {
    store.dispatch(updateTodoJSON(id));
  },
  completeToDo(id) {
    store.dispatch(completeTodoJSON(id));
  },
  completeAllToDos() {
    store.dispatch(completeAllJSON());
  },
  openAllToDos() {
    store.dispatch(clearCompletedJSON());
  },
  // filters the ToDo List ex. appUtils.SHOW_ALL
  filterTodoList(filter) {
    kony.print('@@@@ filterTodoList(filter): ', filter);
    store.dispatch(filterListTodoJSON(filter));
  },
  /*
   * Called on init of frmToToList Form, which is the default form.
   * The state is defaulting the databased on this assumption.
  */
  render() {
    frmToDoList.segTodos.widgetDataMap = { lblTitle: 'text', lblStatus: 'completed', lblTodoId: 'id' };
    frmToDoList.segTodos.setData(
      getVisibileTodos(
        store.getState().todos,
        store.getState().visibilityFilter));

    const theOpenTodo = getOpenTodo(store.getState().todos);
    kony.print('$$$$ theOpenTodo: ', theOpenTodo);
    if (typeof theOpenTodo[0] !== 'undefined') {
      frmToDoList.txtEditTitle.text = theOpenTodo[0].text;
      frmToDoList.lblEditId.text = theOpenTodo[0].id;
    } else {
      frmToDoList.txtEditTitle.text = '';
      frmToDoList.lblEditId.text = '';
    }
  },
};

// import utils is required to make it accessible by app.js
// which is the entry point.  Now we can set it to an undefinded
// var, appUtils, which should be defined in Kony app.  This
// will make everything in utils.js accessible to kony code.
appUtils = appUtil;


appUtil.getStore().subscribe(logState);
appUtil.getStore().subscribe(appUtil.render);
