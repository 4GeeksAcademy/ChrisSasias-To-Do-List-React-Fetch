import React, { useState, useEffect } from "react";

const ToDoList = () => {
    const [task, setTask] = useState({ "label": "", "done": false });
    const [tasks, setTasks] = useState([]);

    const Url = "https://playground.4geeks.com/apis/fake/todos/user/ChrisSasias";

    const GetPast = async () => {
        try {
            let response = await fetch(Url);
            if (response.ok) {
                let data = await response.json()
                setTasks(data);
            }
        } catch(error) {
            console.log(error);
        }
    }

    const updateData = async () => {
        try {
            let response = await fetch(Url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tasks)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch(error) {
            console.log("Hubo un error: ", error);
        }
    }

    useEffect(() => {
        GetPast();
    }, []);

    const addTask = () => {
        setTasks([...tasks, task]);
        setTask({ "label": "", "done": false });
        updateData();
    };

    const clear = (taskToDelete) => {
        const updatedTasks = tasks.filter((task) => task !== taskToDelete);
        setTasks(updatedTasks);
        updateData();
    };

    return (
        <div className="container">
            <h1>List Of Tasks</h1>

            <input
                type="text"
                value={task.label}
                onChange={(event) => setTask({ "label": event.target.value, "done": false })}
            />

            <button className="Button btn btn-success " onClick={addTask}>
                Add
            </button>
            <ul>
                {tasks.map((item, index) => (
                    <li key={index}>
                        {item.label}
                        <span className="delete" onClick={() => clear(item)}>
                            🗑️{" "}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
