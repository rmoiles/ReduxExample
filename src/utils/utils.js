import { createStore } from 'redux';
import reducer from '../reducers';
import { filterListTodoJSON } from '../actions';
import { SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';


const store = createStore(reducer);

const getVisibileTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};

module.exports = {
  getStore() {
    return store;
  },
  // filters the ToDo List ex. appUtils.SHOW_ALL
  filterTodoList(filter) {
    store.dispatch(filterListTodoJSON(filter));
  },
  /*
   * Called on init of frmToToList Form, which is the default form.
   * The state is defaulting the databased on this assumption.
  */
  renderTodoList() {
    frmToDoList.segTodos.widgetDataMap = { lblTitle: 'text', lblStatus: 'completed', lblTodoId: 'id' };
    frmToDoList.segTodos.setData(
      getVisibileTodos(
        store.getState().todos,
        store.getState().visibilityFilter));
  },
};
