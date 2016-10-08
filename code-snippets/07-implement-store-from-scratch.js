'use strict';

console.clear();

// Assets:
// - Redux
// <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.6.0/redux.min.js" />

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

// define createStore from scratch
var createStore = function createStore(reducer) {
  var state = undefined;
  var listeners = [];

  var getState = function getState() {
    return state;
  };

  var dispatch = function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(function (listener) {
      return listener();
    });
  };

  var subscribe = function subscribe(listener) {
    listeners.push(listener);
    return function () {
      listeners = listeners.filter(function (l) {
        return l !== listener;
      });
    };
  };

  dispatch({});

  return { getState: getState, dispatch: dispatch, subscribe: subscribe };
};

var store = createStore(counter);

var render = function render() {
  document.body.innerText = store.getState();
};

render();

document.addEventListener('click', function () {
  store.dispatch({ type: 'INCREMENT' });
});

store.subscribe(function () {
  render();
});