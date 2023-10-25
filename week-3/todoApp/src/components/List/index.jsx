import { EditIcon, CloseIcon } from '@chakra-ui/icons'
import React from 'react'

function List({ todos, setTodos, setInputText }) {
    
    const completedHandler = (id) => {
        setTodos(
            todos.map((todo) => 
            todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo
        
        ))
    }

    const allCompleteHandler = () =>{
        setTodos(
            todos.map((todo) => 
                todo.isCompleted ? todo : {...todo, isCompleted: !todo.isCompleted}
            )
        )
    }

    const deleteHandler = (id) => {
        setTodos(
            todos.filter((todo) => todo.id !== id)
        )
    }

    const updateHandler = (x) => {
        setInputText(x.inputText)
        deleteHandler(x.id)
        document.getElementById('newTodo').focus();
    }

    return (
        <div>
            <section className="main">
                <input   className="toggle-all" type="checkbox" />
                <label onClick={ allCompleteHandler} htmlFor="toggle-all">
                    Mark all as complete
                </label>

                <ul className="todo-list">
                    {
                        todos.map((todo) => (
                            <li key={todo.id} className={`${todo.isCompleted ? 'completed':''}`}>
                                <div className="view">
                                    <input onClick={() => completedHandler(todo.id)} className="toggle" checked={todo.isCompleted} type="checkbox" readOnly  />
                                    <label>{todo.inputText}</label>
                                    <CloseIcon boxSize={2} onClick={() => deleteHandler(todo.id)} className="destroy"></CloseIcon>
                                    <EditIcon onClick={() => updateHandler(todo)}  className='update' />
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>
    )
}

export default List