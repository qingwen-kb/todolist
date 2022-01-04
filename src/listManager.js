import database from "./testDB.js";
import { createTask, createToDoList } from "./createToDo.js";
import { format } from "date-fns";
import { storageAvailable } from "./storage.js";

export default function listManagerObj() {
  let storageList = [];
  let activeList = "Default";
  let activeListIdx = 0;
  const proto = {
    type: "project",
    initDefaultList() {
      let defaultList = createToDoList("Default");
      database.forEach((input) => {
        defaultList.list.push(createTask(input));
      });
      storageList.push(defaultList);
      // if (!localStorage) {
      //   localStorage.setItem("Default", JSON.stringify(defaultList));
      // }
    },
    createList(userInput) {
      const foundList = this.storageList.find(
        (element) => element.listName.toLowerCase() === userInput.toLowerCase()
      );
      if (!foundList) {
        let newList = createToDoList(userInput);
        newList.addTask({
          taskDescription: "Example task",
          dueDate: new Date(),
        });
        storageList.push(newList);
        // localStorage.setItem(newList.listName, JSON.stringify(newList));
      } else {
        return -1;
      }
    },
    toggleIsDone(taskDescription) {
      const foundTask = storageList[this.activeListIdx].list.find(
        (element) => element.taskDescription === taskDescription
      );
      foundTask.toggleDone();
    },
    setIsNotDone(taskDescription) {
      const foundTask = storageList[this.activeListIdx].list.find(
        (element) => element.taskDescription === taskDescription
      );
      foundTask.isNotDone();
    },
    removeTaskFromActiveList(taskDescription) {
      storageList[this.activeListIdx].removeTaskByDescription(taskDescription);
    },
    editTaskFromActiveList(newDescription, foundTaskIdx) {
      storageList[this.activeListIdx].editTaskDescription(
        newDescription,
        foundTaskIdx
      );
    },
    setActiveList(activeList) {
      this.activeList = activeList;
      this.activeListIdx = storageList.findIndex(
        (element) => element.listName === this.activeList
      );
    },
    updateListEntry(entry) {
      // JSON.parse(localStorage.getItem(this.activeList)).list.addTask(entry);
      storageList[this.activeListIdx].addTask(entry);
      // console.log(storageList);
      // localStorage.setItem(
      //   this.activeList,
      //   JSON.stringify(storageList[this.activeListIdx])
      // );
    },
    getActiveList() {
      return storageList[this.activeListIdx];
      // return JSON.parse(localStorage.getItem(this.activeList));
    },
    // displayList() {
    //   return JSON.parse(localStorage.getItem(this.activeList));
    // },
  };

  return Object.assign(Object.create(proto), {
    activeList,
    activeListIdx,
    storageList,
  });
}
