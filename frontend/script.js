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
        if (task.completed) {
            li.classList.add("completed");
            li.style.backgroundColor = "#d4d4d4e8"
        }
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleTask(index, !task.completed));

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.onclick = () => deleteTask(index);

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        list.appendChild(li);
        console.log(li);
    });
}


async function toggleTask(index, completed) {
    await fetch(`${apiUrl}/${index}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: completed })
    });
    loadTasks();
}

async function addTask() {
    const taskInput = document.getElementById("taskInput").value.trim();
    if (taskInput) {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: taskInput, completed: false })
        });
        document.getElementById('taskInput').value = "";
        loadTasks();
    }
}

async function deleteTask(index) {
    await fetch(`${apiUrl}/${index}`, { method: "DELETE" }); 
    loadTasks(); 
}

document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {  
        event.preventDefault();   
        addTask();               
    }
});

async function dropDown() {
    document.getElementById("taskDropdown").classList.toggle("show");
}
window.onclick = function(event) {
    if(!event.target.matches('.three-dot')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
}

loadTasks();
