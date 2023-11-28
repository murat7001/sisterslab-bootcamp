// localTodoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

export const localTodoSlice = createSlice({
    name: 'localTodo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.items.push(action.payload);
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        removeTodo: (state, action) => {
            state.items = state.items.filter(todo => todo.id !== action.payload);
            localStorage.setItem('todos', JSON.stringify(state.items));
        },
        completeTodo: (state, action) => {
            const todo = state.items.find((t) => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                localStorage.setItem('todos', JSON.stringify(state.items));
            }
        },
        getTodos: (state) => {
            state.items = JSON.parse(localStorage.getItem('todos')) || [];
        },
    },
});

export const { addTodo, removeTodo, completeTodo, getTodos } = localTodoSlice.actions;

export default localTodoSlice.reducer;
