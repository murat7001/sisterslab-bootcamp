import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';
import localTodoReducer from './localTodoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
    localTodo: localTodoReducer,
  },
});
