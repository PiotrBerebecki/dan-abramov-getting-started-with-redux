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

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (state.id === action.id) {
        return { ...state, completed: !state.completed };
      }
      return state;
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const { combineReducers } = Redux;

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});
// The above uses  ES6 'object literal property value shorhand'

// The below can be replaced with the above
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   };
// };

const { createStore } = Redux;
const store = createStore(todoApp);

console.log('Initial State');
console.log(store.getState());
console.log('-------------');

console.log('Dispatch ADD_TODO.');
store.dispatch({
  id: 0,
  text: 'Learn Redux',
  type: 'ADD_TODO',
});
console.log('Current State');
console.log(store.getState());
console.log('-------------');

console.log('Dispatch ADD_TODO.');
store.dispatch({
  id: 1,
  text: 'Go Shopping',
  type: 'ADD_TODO',
});
console.log('Current State');
console.log(store.getState());
console.log('-------------');

console.log('Dispatch TOGGLE_TODO.');
store.dispatch({
  id: 0,
  type: 'TOGGLE_TODO',
});
console.log('Current State');
console.log(store.getState());
console.log('-------------');

console.log('Dispatch SET_VISIBILITY_FILTER.');
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETE',
});
console.log('Current State');
console.log(store.getState());
console.log('-------------');
