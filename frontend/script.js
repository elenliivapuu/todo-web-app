const apiUrl = "http://127.0.0.1:5000/tasks";

// Load tasks from Flask
async function loadTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = 'task';
        li.innerHTML = `
            <span>${task}</span>
            <button onclick="deleteTask(${index})">❌</button>
        `;
        list.appendChild(li);
    });
}

async function addTask() {
    const task = document.getElementById("taskInput").value;
    if (task) {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task })
        });
        document.getElementById('taskInput').value = "";
        loadTasks();
    }
}

async function deleteTask(index) {
    await fetch(`${apiUrl}/${index}`, { method: "DELETE" }); 
    loadTasks(); 
}

loadTasks();
