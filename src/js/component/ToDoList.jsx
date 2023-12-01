import React, { useState, useEffect } from "react";

const API_URL = "https://playground.4geeks.com/apis/fake/todos/user/ChrisSasias/";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [highlightedTask, setHighlightedTask] = useState(null);

  useEffect(() => {

    fetchTasks();
  }, []);

x
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
        throw new Error(`Error adding task! Status: ${response.status}`)
      }
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        createUser(API_URL, []);
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error getting task list:", error.message);
    }
  };

  const addTask = () => {

    if (tasks.find((t) => t.label === task)) {
      alert("This task already exists. Please enter a unique task.");
      return;
    }

    updateList([...tasks, { label: task, done: false }]);
  };

  const removeTask = (taskToDelete) => {

    if (!tasks.length) {
      alert("Debe generar un usuario antes de eliminar tareas.");
      return;
    }

    updateList(tasks.filter((t) => t.label !== taskToDelete.label));
  };

  const updateList = async (body) => {
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error adding task! Status: ${response.status}`);
      }
      setTask("");
      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error.message);
    }


  };

  const clearUser = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting user! Status: ${response.status}`);
      }

      await createUser(API_URL, []);

    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  return (
    <div className="container">
      <h1>Task List</h1>

      <input
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && task.trim() !== "" && addTask()}
      />

      <button className="Button btn btn-success" onClick={addTask}>
        Add
      </button>
      <button
        className="btn btn-danger"
        onClick={clearUser}
        disabled={!tasks.length}

      >
        Delete User
      </button>

      {tasks.length === 0 ? (
        <p className="msg text-danger">No tasks have been entered.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li
              key={task.label}
              onMouseOver={() => setHighlightedTask(index)}
            >
              {task.label}
              {(highlightedTask === index || highlightedTask === "delete") && (
                <span className="delete" onClick={() => removeTask(task)}>
                  🗑️
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