'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

console.clear();

// Assets:
// - Redux
// <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js" />
// - React
// <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js" />
// - React DOM
// <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js" />
// - expect
// <script src="https://wzrd.in/standalone/expect@latest" />
// - Deep Freeze
// <script src="https://wzrd.in/standalone/deep-freeze@latest" />

var todo = function todo(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id === action.id) {
        return _extends({}, state, { completed: !state.completed });
      }
      return state;
    default:
      return state;
  }
};

var todos = function todos() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_TODO':
      return [].concat(state, [todo(undefined, action)]);
    case 'TOGGLE_TODO':
      return state.map(function (t) {
        return todo(t, action);
      });
    default:
      return state;
  }
};

var visibilityFilter = function visibilityFilter() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 'SHOW_ALL' : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

var todoApp = function todoApp() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
};

var _Redux = Redux;
var createStore = _Redux.createStore;

var store = createStore(todoApp);

console.log('Initial State');
console.log(store.getState());
console.log('-------------');

console.log('Dispatch ADD_TODO.');
store.dispatch({
  id: 0,
  text: 'Learn Redux',
  type: 'ADD_TODO'
});
console.log('Current State');
console.log(store.getState());
console.log('-------------');

console.log('Dispatch ADD_TODO.');
store.dispatch({
  id: 1,
  text: 'Go Shopping',
  type: 'ADD_TODO'
});
console.log('Current State');
console.log(store.getState());
console.log('-------------');

console.log('Dispatch TOGGLE_TODO.');
store.dispatch({
  id: 0,
  type: 'TOGGLE_TODO'
});
console.log('Current State');
console.log(store.getState());
console.log('-------------');

console.log('Dispatch SET_VISIBILITY_FILTER.');
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETE'
});
console.log('Current State');
console.log(store.getState());
console.log('-------------');