const endPoint = "http://127.0.0.1:8000/api";

export async function getAllTasks() {
    try {
        const response = await fetch(`${endPoint}/tasks`);
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function addTask(task) {
    const response = await fetch(`${endPoint}/tasks/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error("Network error");
    } else {
        const json = await response.json();
        return json;
    }
}

export async function deleteTask(id) {
    try {
        const response = await fetch(`${endPoint}/tasks/delete/${id}`, {
            method: "POST",
        });
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function editTaskBy(task) {
    try {
        const response = await fetch(`${endPoint}/tasks/edit/${task.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error(error.message);
    }
}
