import './App.css'
import { useState } from 'react';
import List from './components/List'
import Form from './components/Form'


function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  
  return (
    <div className="todoapp">
      <Form todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText}/>
      <List todos={todos} setTodos={setTodos} inputText={inputText} setInputText={setInputText}  />
    </div>
  );
}

export default App;
