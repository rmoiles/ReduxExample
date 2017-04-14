'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filterListTodoJSON = exports.clearCompleted = exports.completeAll = exports.completeTodoJSON = exports.updateTodo = exports.deleteTodoJSON = exports.addTodoJSON = exports.closeTodoJSON = exports.openTodoJSON = undefined;

var _ActionTypes = require('../constants/ActionTypes');

var types = _interopRequireWildcard(_ActionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var openTodoJSON = exports.openTodoJSON = function openTodoJSON(id) {
    return { type: types.OPEN_TODO, id: id };
};
var closeTodoJSON = exports.closeTodoJSON = function closeTodoJSON() {
    return { type: types.CLOSE_TODO };
};
var addTodoJSON = exports.addTodoJSON = function addTodoJSON(text) {
    return { type: types.ADD_TODO, text: text };
};
var deleteTodoJSON = exports.deleteTodoJSON = function deleteTodoJSON(id) {
    return { type: types.DELETE_TODO, id: id };
};
var updateTodo = exports.updateTodo = function updateTodo(id, text) {
    return { type: types.UPDATE_TODO, id: id, text: text };
};
var completeTodoJSON = exports.completeTodoJSON = function completeTodoJSON(id) {
    return { type: types.COMPLETE_TODO, id: id };
};
var completeAll = exports.completeAll = function completeAll() {
    return { type: types.COMPLETE_ALL };
};
var clearCompleted = exports.clearCompleted = function clearCompleted() {
    return { type: types.CLEAR_COMPLETED };
};
var filterListTodoJSON = exports.filterListTodoJSON = function filterListTodoJSON(filter) {
    return { type: types.SET_VISIBILITY_FILTER, filter: filter };
};