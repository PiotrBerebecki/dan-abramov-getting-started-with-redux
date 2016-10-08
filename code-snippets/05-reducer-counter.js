'use strict';

console.clear();

// Assets for html file:
// - expect
// <script src="https://wzrd.in/standalone/expect@latest" />

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

expect(counter(0, { type: 'INCREMENT' })).toEqual(1);

expect(counter(1, { type: 'INCREMENT' })).toEqual(2);

expect(counter(2, { type: 'DECREMENT' })).toEqual(1);

expect(counter(1, { type: 'DECREMENT' })).toEqual(0);

expect(counter(1, { type: 'SOMETHING_ELSE' })).toEqual(1);

expect(counter(undefined, {})).toEqual(0);

console.log('Test passed!');