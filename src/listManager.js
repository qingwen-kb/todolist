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
      if (localStorage.getItem("Default") === null) {
        let defaultList = createToDoList("Default");
        database.forEach((input) => {
          defaultList.list.push(createTask(input));
        });
        storageList.push(defaultList);
        localStorage.setItem("Default", JSON.stringify(defaultList));
      } else {
        for (let i = 0; i < localStorage.length; i++) {
          let storedList = JSON.parse(
            localStorage.getItem(localStorage.key(i))
          );
          const listProt = createToDoList();
          const taskProt = createTask({
            taskDescription: "random",
            dueDate: "2021-12-02",
          });
          const listWithProto = Object.assign(listProt, storedList);

          listWithProto.list.forEach((task) => {
            task.__proto__ = taskProt.__proto__;
          });

          storageList.push(listWithProto);
        }
        this.activeListIdx = storageList.findIndex(
          (element) => element.listName === "Default"
        );
      }
    },
    createList(userInput) {
      if (userInput === "") {
        return;
      }
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
        localStorage.setItem(newList.listName, JSON.stringify(newList));
      } else {
        return -1;
      }
    },
    toggleIsDone(taskDescription) {
      const foundTask = storageList[this.activeListIdx].list.find(
        (element) => element.taskDescription === taskDescription
      );
      foundTask.toggleDone();
      localStorage.setItem(
        this.activeList,
        JSON.stringify(storageList[this.activeListIdx])
      );
    },
    setIsNotDone(taskDescription) {
      const foundTask = storageList[this.activeListIdx].list.find(
        (element) => element.taskDescription === taskDescription
      );
      foundTask.isNotDone();
      localStorage.setItem(
        this.activeList,
        JSON.stringify(storageList[this.activeListIdx])
      );
    },
    removeTaskFromActiveList(taskDescription) {
      storageList[this.activeListIdx].removeTaskByDescription(taskDescription);
      localStorage.setItem(
        this.activeList,
        JSON.stringify(storageList[this.activeListIdx])
      );
    },
    editTaskFromActiveList(newDescription, foundTaskIdx) {
      storageList[this.activeListIdx].editTaskDescription(
        newDescription,
        foundTaskIdx
      );
      localStorage.setItem(
        this.activeList,
        JSON.stringify(storageList[this.activeListIdx])
      );
    },
    setActiveList(activeList) {
      this.activeList = activeList;
      this.activeListIdx = storageList.findIndex(
        (element) => element.listName === this.activeList
      );
      return this.activeList;
    },
    updateListEntry(entry) {
      storageList[this.activeListIdx].addTask(entry);
      localStorage.setItem(
        this.activeList,
        JSON.stringify(storageList[this.activeListIdx])
      );
    },
    getActiveList() {
      // return storageList[this.activeListIdx];
      return JSON.parse(localStorage.getItem(this.activeList));
    },
  };

  return Object.assign(Object.create(proto), {
    activeList,
    activeListIdx,
    storageList,
  });
}
