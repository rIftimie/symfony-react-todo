import React from "react";
import Button from "react-bootstrap/Button";
import { deleteTask } from "../../services/fetch";

function Task({ task, tasks, setTasks, setEditTask }) {
    async function handleDelete(id) {
        setTasks(tasks.filter((task) => task.id !== id));
        await deleteTask(id);
    }

    async function handleEdit(task) {
        setEditTask(task);
    }

    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (i < task.importance) {
            stars.push(<i className="fa-solid fa-star" key={i}></i>);
        } else {
            stars.push(<i className="fa-regular fa-star" key={i}></i>);
        }
    }

    return (
        <section className="py-3 border-bottom border-primary">
            <h3>{task.title}</h3>
            <p>{stars}</p>
            <p className="fst-italic">Created: {task.date}</p>
            <Button
                variant="outline-secondary"
                onClick={() => handleEdit(task)}
            >
                edit
            </Button>
            <Button
                variant="outline-danger"
                onClick={() => handleDelete(task.id)}
                className="ms-2"
            >
                delete
            </Button>
        </section>
    );
}

export default Task;
