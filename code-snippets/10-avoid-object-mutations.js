'use strict';

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

var toggleTodo = function toggleTodo(todo) {
  // Solution (Object spread syntax)
  return {
    ...todo,
    completed: !todo.completed,
  };

  // Solution
  // 'the last argument in Object.assign() wins'
  // return Object.assign({}, todo, {completed: !todo.completed});
};

var testToggleToDo = function testToggleToDo() {
  var todoBefore = {
    id: 0,
    text: 'Learn Redux',
    completed: false,
  };
  var todoAfter = {
    id: 0,
    text: 'Learn Redux',
    completed: true,
  };
  deepFreeze(todoBefore);
  expect(toggleTodo(todoBefore)).toEqual(todoAfter);
};

testToggleToDo();
console.log('All tests passed.');
