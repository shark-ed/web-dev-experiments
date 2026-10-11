
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        message.textContent = "Please enter a task!";
        taskInput.focus();
        return;
    }

    message.textContent = "";

    // Create a new list item
    const li = document.createElement("li");

    // Create a checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("aria-label", "Mark task as completed");

    // Create task text
    const span = document.createElement("span");
    span.textContent = taskText;

    // Mark task as completed
    checkbox.addEventListener("change", function () {
        li.classList.toggle("completed", checkbox.checked);
    });

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";

    deleteButton.addEventListener("click", function () {
        li.remove();
    });

    // Add elements to the list item
    li.append(checkbox, span, deleteButton);
    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
