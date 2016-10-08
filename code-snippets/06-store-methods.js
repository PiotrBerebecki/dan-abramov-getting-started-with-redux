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

// const { createStore } = Redux;
// const store = createStore(counter);

// getState and dispatch
// console.log(store.getState()); // 0
// store.dispatch({ type: 'INCREMENT' }); // state is now 1
// console.log(store.getState()); // 1

var _Redux = Redux;
var createStore = _Redux.createStore;

var store = createStore(counter);

var render = function render() {
  document.body.innerText = store.getState();
};

render(); // render the initial state

document.addEventListener('click', function () {
  store.dispatch({ type: 'INCREMENT' });
});

store.subscribe(render); // render called every time action is dispatched