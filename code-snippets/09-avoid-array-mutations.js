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

var addCounter = function addCounter(list) {
  // can't use push on the original array as it mutates the array

  // Solution
  return [...list, 0];

  // Solution
  // return [].concat(list, [0]);

  // Solution
  // return list.concat([0]); // prevent mutation with concat

  // Solution
  // const newArr = list.slice();
  // newArr.push(0)
  // return newArr;
};

var removeCounter = function removeCounter(list, index) {
  // can't use splice on the original array as it mutates the array

  // Solution
  return [].concat(list.slice(0, index), list.slice(index + 1));

  // Solution
  // return list.filter((item, i) => i !== index);

  // Solution
  // return list
  //   .slice(0, index)
  //   .concat(list.slice(index + 1));
};

var incrementCounter = function incrementCounter(list, index) {
  // cannot do list[index]++ as it mutates the original array

  // Solution
  return [].concat(
    list.slice(0, index),
    [list[index] + 1],
    list.slice(index + 1)
  );

  // Solution
  // return list
  //   .slice(0, index)
  //   .concat([list[index] + 1])
  //   .concat(list.slice(index + 1));
};

// ---------------------------------------------------------------
// TESTS

var testAddCounter = function testAddCounter() {
  var listBefore = [];
  var listAfter = [0];
  deepFreeze(listBefore); // prevents mutations of the argument
  expect(addCounter(listBefore)).toEqual(listAfter);
};

var testRemoveCounter = function testRemoveCounter() {
  var listBefore = [0, 10, 20];
  var listAfter = [0, 20];
  deepFreeze(listBefore);
  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};

var testIncrementCounter = function testIncrementCounter() {
  var listBefore = [0, 10, 20];
  var listAfter = [0, 11, 20];
  deepFreeze(listBefore);
  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('All tests passed.');
