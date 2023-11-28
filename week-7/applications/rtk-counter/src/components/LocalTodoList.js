import { addTodo, removeTodo, completeTodo, getTodos } from '@/store/localTodoSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const TodoList = () => {
    const todos = useSelector((state) => state.localTodo.items);
    const dispatch = useDispatch();
    const [todoText, setTodoText] = useState('');

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodo({ title: todoText, id: Date.now(), completed: false }));
        setTodoText('');
    };

    const handleCompleteTodo = (todoId) => {
        dispatch(completeTodo(todoId))
    }

    const handleRemove = (todoId) => {
        dispatch(removeTodo(todoId))
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Add New Todo"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
            />
            <button onClick={handleSubmit}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input onClick={() => handleCompleteTodo(todo.id)} checked={todo.completed} type="checkbox" readOnly />
                        {todo.title}
                        <button onClick={() => handleRemove(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
