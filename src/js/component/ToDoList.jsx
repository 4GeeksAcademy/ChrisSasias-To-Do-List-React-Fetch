import React, { useState, useEffect } from "react";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [highlightedTask, setHighlightedTask] = useState(null);

  useEffect(() => {
    createUser("https://playground.4geeks.com/apis/fake/todos/user/ChrisSasias", []);
    fetchTasks();
  }, []);

  useEffect(() => {
    updateList();
  }, [tasks]);

  const createUser = async (url, body) => {

    try {

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),

      });

      if (!response.ok) {
        throw new Error(`Error al agregar tarea! Status: ${response.status}`);
      }

      console.log(response);

    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };


  const fetchTasks = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/ChrisSasias");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener la lista de tareas:", error);
    }
  };

  const addTask = () => {

    setTasks([...tasks, { label: task, done: false }]);

  }


  const removeTask = (taskToDelete) => {

    setTasks(tasks.filter((t) => t.label !== taskToDelete.label));

  }

  const updateList = async () => {
    try {

      const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/ChrisSasias", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tasks),
      });

      if (!response.ok) {
        throw new Error(`Error al agregar tarea! Status: ${response.status}`);
      }
      setTask("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };


  return (
    <div className="container">
      <h1>List Of Tasks</h1>

      <input
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && task.trim() !== "" && addTask()}
      />

      <button className="Button btn btn-success " onClick={addTask}>
        Add
      </button>

      {tasks.length === 0 ? (
        <p className="msg">No tasks entered.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              onMouseOver={() => setHighlightedTask(index)}
            >
              {task.label}
              {(highlightedTask === index || highlightedTask === "delete") && (
                <span className="delete" onClick={() => removeTask(task)}>
                  🗑️{" "}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoList;