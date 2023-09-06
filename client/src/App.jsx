import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [todo, setTodo] = useState([]);

  // Fetch initial data from the server when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5001/") // Replace with your actual server endpoint
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  }, []);

  const submit = () => {
    axios
      .post("http://localhost:5001/createTodo", { task }) // Replace with your actual server endpoint
      .then((res) => {
        console.log(res);
        setTask("");
        // After adding a new task, you may want to update the list of tasks
        axios
          .get("http://localhost:5001/") // Fetch updated data
          .then((res) => setTodo(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const edit = (id) => {
    axios
      .put("http://localhost:5001/updateTodo/" + id) // Replace with your actual server endpoint
      .then((res) => {
        console.log(res);
        // After editing a task, you may want to update the list of tasks
        axios
          .get("http://localhost:5001/") // Fetch updated data
          .then((res) => setTodo(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const deleteTask = (id) => {
    axios
      .delete("http://localhost:5001/deleteTodo/" + id) // Replace with your actual server endpoint
      .then((res) => {
        console.log(res);
        // After deleting a task, you may want to update the list of tasks
        axios
          .get("http://localhost:5001/") // Fetch updated data
          .then((res) => setTodo(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={submit}> Done </button>

        <ul>
          {todo.map((todoList) => {
            return (
              <li key={todoList._id}>
                {todoList.task}{" "}
                <button onClick={() => edit(todoList._id)}>EDIT</button>
                <button onClick={() => deleteTask(todoList._id)}>DELETE</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
