// const apiUrl = "http://127.0.0.1:5001/tasks";

// // Load tasks from Flask
// async function loadTasks() {
//     const response = await fetch(apiUrl);
//     const tasks = await response.json();
//     const list = document.getElementById("taskList");
//     list.innerHTML = "";

//     tasks.forEach((task, index) => {
//         const li = document.createElement("li");
//         li.className = 'task';
//         li.draggable = true;
//         li.id = `task-${index}`;
//         li.ondragstart = (event) => drag(event);
//         if (task.completed) {
//             li.classList.add("completed");
//             li.style.backgroundColor = "#d4d4d4e8"
//         }
        
//         const checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.checked = task.completed;
//         checkbox.addEventListener("change", () => toggleTask(index, !task.completed));

//         const taskText = document.createElement("span");
//         taskText.textContent = task.text;
//         if (task.completed) {
//             taskText.style.textDecoration = "line-through";
//             taskText.style.color = "gray";
//         }

//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "X";
//         deleteButton.onclick = () => deleteTask(index);

//         li.appendChild(checkbox);
//         li.appendChild(taskText);
//         li.appendChild(deleteButton);
//         list.appendChild(li);
        
//     });
// }

// function allowDrop(event) {
//     event.preventDefault();
// }

// function drag(event) {
//     event.dataTransfer.setData("text", event.target.id);
// }

// function drop(event) {
//     event.preventDefault();

//     const draggedTaskId = event.dataTransfer.getData("text");
//     const draggedElement = document.getElementById(draggedTaskId);
//     const taskList = document.getElementById("taskList");

    
// }


// async function toggleTask(index, completed) {
//     await fetch(`${apiUrl}/${index}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ completed: completed })
//     });
//     loadTasks();
// }

// async function addTask() {
//     const taskInput = document.getElementById("taskInput").value.trim();
//     if (taskInput) {
//         await fetch(apiUrl, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ text: taskInput, completed: false })
//         });
//         document.getElementById('taskInput').value = "";
//         loadTasks();
//     }
// }

// async function deleteTask(index) {
//     await fetch(`${apiUrl}/${index}`, { method: "DELETE" }); 
//     loadTasks(); 
// }

// document.getElementById("taskInput").addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {  
//         event.preventDefault();   
//         addTask();               
//     }
// });

// async function dropDown() {
//     document.getElementById("taskDropdown").classList.toggle("show");
// }
// window.onclick = function(event) {
//     if(!event.target.matches('.three-dot')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains("show")) {
//                 openDropdown.classList.remove("show");
//             }
//         }
//     }
// }

// loadTasks();


const apiUrl = "http://127.0.0.1:5001/tasks";

// Load tasks from Flask
async function loadTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const list = $("#taskList");
    list.empty();

    tasks.forEach((task, index) => {
        const li = $(`
            <li class="task" id="task-${index}">
                <input type="checkbox" ${task.completed ? "checked" : ""}>
                <span>${task.text}</span>
                <button>X</button>
            </li>
        `);

        // Style completed tasks
        if (task.completed) {
            li.addClass("completed").css("background-color", "#d4d4d4e8");
            li.find("span").css({ "text-decoration": "line-through", "color": "gray" });
        }

        // Toggle checkboxes
        li.find("input").on("change", function () {
            toggleTask(index, !task.completed);
        });

        // Delete button
        li.find("button").on("click", function () {
            deleteTask(index);
        });

        list.append(li);
    });

     // Enable jQuery UI sortable (Drag & Drop)
     $("#taskList").sortable({
        update: function (event, ui) {
            console.log("Task moved:", ui.item.index()); // Debugging
        }
    });
}

// Toggle task completion
async function toggleTask(index, completed) {
    await fetch(`${apiUrl}/${index}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: completed })
    });
    loadTasks();
}

async function addTask() {
    const taskInput = $("#taskInput").val().trim();
    if (taskInput) {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: taskInput, completed: false })
        });
        $("#taskInput").val(""); 
        loadTasks();
    }
}

// Delete task
async function deleteTask(index) {
    await fetch(`${apiUrl}/${index}`, { 
        method: "DELETE" 
    });
    loadTasks();
}

// Enter to add task
$("#taskInput").on("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});

// Dropdown toggle for three-dot menu
function dropDown() {
    $("#taskDropdown").toggleClass("show");
}


// Close dropdown when clicking outside
$(window).on("click", function (event) {
    if (!$(event.target).hasClass("three-dot")) {
        $(".dropdown-content").removeClass("show");
    }
});

// Load tasks when page loads
$(document).ready(loadTasks);