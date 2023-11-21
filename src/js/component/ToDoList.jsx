import React, { useState, useEffect } from "react";

const ToDoList = () => {
    const [task, setTask] = useState({ "label": "", "done": false });
    const [tasks, setTasks] = useState([]);

    const GetPast = async () => {
        try {
            let response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/ChrisSasias");
            if (response.ok) {
                let data = await response.json()

                setTasks(data);

            }
        } catch(error) {

            
            console.log(error);

        }

    }

    useEffect(()=>{GetPast()}, []);

    // const addTask = () => {
    //     setTasks([...tasks, task]);
    //     setTask("");
    // };
    const clear = (taskToDelete) => {
        const updatedTasks = tasks.filter((task) => task !== taskToDelete);
        setTasks(updatedTasks);
    };

    return (
        <div className="container">
            <h1>List Of Tasks</h1>

            <input
                type="text"
                value={task.label}
                onChange={(event) => setTask(event.target.value)}
            />

            <button className="Button btn btn-success " >
                Add
            </button>
            <ul>
                {tasks.map((item, index) => (
                    <li key={index}>
                        {item.label}
                        <span className="delete" onClick={() => clear(item.label)}>
                            🗑️{" "}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
