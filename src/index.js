import listManagerObj from "./listManager.js";
import component from "./component.js";
import "./style.css";

const body = document.querySelector("body");
const addTaskForm = document.querySelector(".add-task-form");
const addProjectForm = document.querySelector(".add-project-form");
const taskContainer = document.querySelector(".task-container");
const projectContainer = document.querySelector(".project-container");
const sort = document.querySelector(".sort");

const listManager = listManagerObj();
listManager.initDefaultList();
renderActiveList();
// renderProjectList();
projectContainer.addEventListener("click", (event) => {
  listManager.setActiveList(event.target.textContent);
  renderActiveList();
});

addProjectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let userInput = event.target[0].value;
  event.target[0].value = "";
  const createNewList = listManager.createList(userInput);
  if (!createNewList) {
    const projectTitle = document.createElement("p");
    projectTitle.textContent = userInput;
    projectContainer.appendChild(projectTitle);
  }
});

addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let taskDescription = event.target[0].value;
  event.target[0].value = "";
  let dueDate = event.target[1].value;
  const taskEntry = {
    taskDescription: taskDescription,
    dueDate: dueDate,
  };
  listManager.updateListEntry(taskEntry);
  renderActiveList();
});

function renderActiveList() {
  taskContainer.textContent = "";

  listManager.getActiveList().list.forEach((task) => {
    const para = component(task);
    taskContainer.appendChild(para);
  });
}

// function renderProjectList() {
//   for (let i = 0; i < localStorage.length; i++) {
//     let key = JSON.parse(localStorage.getItem(localStorage.key(i))).listName;
//     const projectTitle = document.createElement("p");
//     projectTitle.textContent = key;
//     projectContainer.appendChild(projectTitle);
//   }
// }

taskContainer.addEventListener("click", (event) => {
  if (event.target.type === "checkbox") {
    let description = event.target.nextSibling.children[0].textContent;
    listManager.toggleIsDone(description);
    renderActiveList();
  }
  if (event.target.classList.value === "del-btn") {
    let searchKey =
      event.target.parentElement.parentElement.children[0].children[1]
        .children[0].textContent;
    listManager.removeTaskFromActiveList(searchKey);
    renderActiveList();
  }
  if (event.target.classList.value === "edit-btn") {
    let originalPara =
      event.target.parentElement.parentElement.children[0].children[1]
        .children[0];
    originalPara.classList.toggle("editMode");
    let originalDescription = originalPara.textContent;
    let foundTaskIdx = listManager
      .getActiveList()
      .list.findIndex(
        (element) => element.taskDescription === originalDescription
      );
    let editInput =
      event.target.parentElement.parentElement.children[0].children[1]
        .children[1];
    if (originalPara.classList.contains("editMode")) {
      editInput.setAttribute("style", "display:block;");
      editInput.value = originalDescription;
    } else {
      editInput.setAttribute("style", "display:none;");
      if (editInput.value === "") {
        listManager.editTaskFromActiveList(originalDescription, foundTaskIdx);
      } else {
        listManager.editTaskFromActiveList(editInput.value, foundTaskIdx);
        listManager.setIsNotDone(editInput.value);
      }
      renderActiveList();
    }
  }
});
