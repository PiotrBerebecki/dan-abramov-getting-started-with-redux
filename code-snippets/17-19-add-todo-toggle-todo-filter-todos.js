'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

// todo reducer
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

// todos reducer
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

// visibilityFilter reducer
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

// combineReducers
var _Redux = Redux;
var combineReducers = _Redux.combineReducers;

var todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

var _Redux2 = Redux;
var createStore = _Redux2.createStore;

var store = createStore(todoApp);

var _React = React;
var Component = _React.Component;

var FilterLink = function FilterLink(_ref) {
  var filter = _ref.filter;
  var currentFilter = _ref.currentFilter;
  var children = _ref.children;

  if (filter === currentFilter) {
    return React.createElement(
      'span',
      null,
      children
    );
  }

  return React.createElement(
    'a',
    { href: '#',
      onClick: function onClick(e) {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter: filter
        });
      }
    },
    children
  );
};

var getVisibleTodos = function getVisibleTodos(todos, filter) {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(function (todo) {
        return !todo.completed;
      });
    case 'SHOW_COMPLETED':
      return todos.filter(function (todo) {
        return todo.completed;
      });
  }
};

var nextTodoId = 0;

var TodoApp = function (_Component) {
  _inherits(TodoApp, _Component);

  function TodoApp() {
    _classCallCheck(this, TodoApp);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TodoApp.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var todos = _props.todos;
    var visibilityFilter = _props.visibilityFilter;

    var visibleTodos = getVisibleTodos(todos, visibilityFilter);

    return React.createElement(
      'div',
      null,
      React.createElement(
        'form',
        { onSubmit: function onSubmit(e) {
            e.preventDefault();
            store.dispatch({
              type: 'ADD_TODO',
              text: _this2.input.value,
              id: nextTodoId++,
              completed: false
            });
            _this2.input.value = '';
          } },
        React.createElement('input', { type: 'text',
          ref: function ref(node) {
            _this2.input = node;
          } }),
        React.createElement(
          'button',
          { action: 'submit' },
          'Add Todo'
        )
      ),
      React.createElement(
        'ul',
        null,
        visibleTodos.map(function (todo) {
          return React.createElement(
            'li',
            { key: todo.id,
              onClick: function onClick() {
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  id: todo.id
                });
              },
              style: { textDecoration: todo.completed ? 'line-through' : 'none' } },
            todo.text
          );
        })
      ),
      React.createElement(
        'p',
        null,
        'Show:  ',
        React.createElement(
          FilterLink,
          { filter: 'SHOW_ALL',
            currentFilter: visibilityFilter },
          'All'
        ),
        ' ',
        React.createElement(
          FilterLink,
          { filter: 'SHOW_ACTIVE',
            currentFilter: visibilityFilter },
          'Active'
        ),
        ' ',
        React.createElement(
          FilterLink,
          { filter: 'SHOW_COMPLETED',
            currentFilter: visibilityFilter },
          'Completed'
        ),
        ' '
      )
    );
  };

  return TodoApp;
}(Component);

var render = function render() {
  ReactDOM.render(React.createElement(TodoApp, store.getState()), document.getElementById('root'));
};

store.subscribe(render);
render();