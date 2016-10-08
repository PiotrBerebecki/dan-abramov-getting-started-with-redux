'use strict';

console.clear();

// Assets:
// - Redux
// <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js" />
// - React
// <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js" />
// - React DOM
// <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js" />

var counter = function counter() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

var Counter = function Counter(_ref) {
  var value = _ref.value;
  var onIncrement = _ref.onIncrement;
  var onDecrement = _ref.onDecrement;
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      value
    ),
    React.createElement(
      'button',
      { onClick: onIncrement },
      '+'
    ),
    React.createElement(
      'button',
      { onClick: onDecrement },
      '-'
    )
  );
};

var _Redux = Redux;
var createStore = _Redux.createStore;

var store = createStore(counter);

var render = function render() {
  ReactDOM.render(React.createElement(Counter, { value: store.getState(),
    onIncrement: function onIncrement() {
      return store.dispatch({ type: 'INCREMENT' });
    },
    onDecrement: function onDecrement() {
      return store.dispatch({ type: 'DECREMENT' });
    } }), document.getElementById('root'));
};

render();

store.subscribe(function () {
  render();
});