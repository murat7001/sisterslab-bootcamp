import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    items: [],
};

export const localTodoSlice = createSlice({
    name: 'localTodo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.items.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.items = state.items.filter(todo => todo.id !== action.payload);
        },
        completeTodo: (state, action) => {
            const todo = state.items.find((t) => t.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    },
})

export const { addTodo, removeTodo, completeTodo } = localTodoSlice.actions

export default localTodoSlice.reducer