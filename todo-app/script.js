const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  createTask(taskText, false);
  saveTasks();
  input.value = "";
}

function createTask(text, completed) {
  const li = document.createElement("li");
  li.textContent = text;

  if (completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.classList.add("delete");
  delBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    taskList.removeChild(li);
    saveTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createTask(task.text, task.completed);
  });
}
