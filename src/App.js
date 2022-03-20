import React from 'react'
import {useState, useRef ,useEffect} from 'react'
import './App.css';

function App() {

  let initialTodo;
  if (localStorage.getItem("todos") === null) {
    initialTodo = [];
  }
  else {
    initialTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todoItems, setTodoItems] = useState(initialTodo);
  const [currTask, setCurrTask] = useState("");

  const inputTask = useRef(null); 

  const AddToDo = () => {
    if (!currTask) {
      alert("Please!! Enter Task ✍");
    }
    else {
      setTodoItems([...todoItems, {ToDo: currTask, status: false}]);
      inputTask.current.value = "";
      setCurrTask("");
    }
  }

  const Delete = (val) => {
    setTodoItems(
      todoItems.filter((item, key) => {
        return key !== val;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todoItems));
  }

  const Complete = (val) => {
    setTodoItems(
      todoItems.map((item, key) => {
        return (key === val ? {ToDo: item.ToDo, status: true} : {ToDo: item.ToDo, status: item.status})
      })
    )
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoItems));
  }, [todoItems])

  return (
    <div className="App">
      <section id="Input">
        <h1>📃 To-Do List ✍</h1>
        <div>
          <input 
            ref={inputTask}
            type="text" 
            placeholder="📃Enter a Task..."
            onChange={(e) => {setCurrTask(e.target.value)}} 
            onKeyDown={(e) => {if(e.code === 'Enter') AddToDo();}} 
          />
          <button id="Add" onClick={AddToDo}>✍Add Task</button>
        </div>
      </section>
      <hr/>
      <section id="Todos">
        <ul>
          {todoItems.length===0?<li>👌 Hurrah!! No Task To Do 🏆</li>:
            todoItems.map((item, key) => {
              return (
                <div id="ToDo">
                  <li key={key}>{item.ToDo}</li>
                  <button id="comp" onClick={() => {Complete(key)}}>🏆Completed</button>
                  <button id="del" onClick={() => {Delete(key)}}>❌Delete!!</button>
                  {item.status ? <h3>Status : 👍 Done!!</h3> : <h3>Status : Not Done!!</h3> }
                </div>
                
              )
            })
          }
        </ul>
      </section>
    </div>
  );
}

export default App;

