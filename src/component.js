export default function addTaskComponent(taskInput) {
  const task = document.createElement("div");
  const taskField = document.createElement("div");
  const taskText = document.createElement("div");
  const taskDescribe = document.createElement("p");
  const editTaskDescribe = document.createElement("input");
  const taskDueDate = document.createElement("p");
  const taskDayFromNow = document.createElement("p");
  const checkbox = document.createElement("input");
  const controlBtn = document.createElement("div");
  const editBtn = document.createElement("div");
  const delBtn = document.createElement("div");
  task.classList.add("task");
  taskField.classList.add("task-fields");
  taskText.classList.add("task-text");
  if (taskInput.isDone) {
    checkbox.checked = true;
    taskDescribe.classList.add("is-done");
  }
  editTaskDescribe.type = "text";
  editTaskDescribe.classList.add("edit-task");
  taskDescribe.classList.add("task-description");
  checkbox.classList.add("checkbox");
  editBtn.classList.add("edit-btn");
  delBtn.classList.add("del-btn");
  checkbox.type = "checkbox";
  taskDescribe.textContent = `${taskInput.taskDescription}`;
  taskDueDate.textContent = `${taskInput.formatDate}`;
  taskDayFromNow.textContent = `${taskInput.dayFromNow}`;

  editBtn.textContent = "edit";
  delBtn.textContent = "delete";
  controlBtn.append(editBtn, delBtn);
  controlBtn.classList.add("controlBtn");
  taskText.append(taskDescribe, editTaskDescribe);
  taskField.append(checkbox, taskText, taskDueDate, taskDayFromNow);
  task.append(taskField, controlBtn);
  return task;
}
