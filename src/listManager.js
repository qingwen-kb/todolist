import database from "./testDB.js"
import {
    createTask,
    createToDoList
} from "./createToDo.js";

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
        },
        createList(userInput) {
            let newList = createToDoList(userInput)
            storageList.push(newList)
        },
        toggleIsDone(taskDescription) {
            const foundTask = storageList[this.activeListIdx].list.find(element => element.taskDescription === taskDescription);
            foundTask.setDone();
        },
        removeTaskFromActiveList(taskDescription) {

            // const foundTask = storageList[this.activeListIdx].list.find(element => element.taskDescription === taskDescription);
            storageList[this.activeListIdx].removeTaskByDescription(taskDescription);
            // console.log(foundTask);
        },
        editTaskFromActiveList(newDescription, foundTaskIdx) {
            storageList[this.activeListIdx].editTaskDescription(newDescription, foundTaskIdx);
        },
        setActiveList(activeList) {
            this.activeList = activeList;
            this.activeListIdx = storageList.findIndex(element => element.listName === this.activeList);
        },
        updateListEntry(entry) {
            storageList[this.activeListIdx].addTask(entry);
        },
        getActiveList() {
            return storageList[this.activeListIdx];
        }
    };

    return Object.assign(Object.create(proto), {
        activeList,
        activeListIdx,
        storageList
    });
}