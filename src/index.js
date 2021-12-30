import database from "./testDB.js"
import createToDoList from "./createToDo.js";

const CREATE_LIST1 = createToDoList(database, "List-1");
const newInput = {
    title: "Buy Fridge",
    description: "Renovation",
    dueDate: "Today",
    priority: "High"
};

console.log(CREATE_LIST1.printTasks());
console.log(CREATE_LIST1.removeTaskByTitle("Programming"));
console.log(CREATE_LIST1.printTasks());