function createTask(userInput) {
    const {
        taskDescription,
        dueDate,
    } = userInput;
    let isDone = false;
    const proto = {
        type: "task",
        setDone() {
            return this.isDone = !this.isDone;
        },

    }
    return Object.assign(Object.create(proto), {
        taskDescription,
        dueDate,
        isDone,
    })
}

function createToDoList(listName) {
    let list = [];
    const proto = {
        type: "list",
        getNumOfTasks() {
            return this.list.length;
        },
        getNumCompletedTasks() {
            let completed = 0;
            for (let todo of this.list) {
                if (todo.isDone) {
                    completed++;
                }
            }
            return completed;
        },
        printNotDoneTask() {
            for (let task of this.list) {
                if (!task.isDone) {
                    console.log(task);
                }
            }
        },
        printTasks() {
            for (let task of this.list) {
                console.log(task);
            }
        },
        addTask(input) {
            return this.list.push(createTask(input));
        },
        editTaskDescription(newDescription, foundTaskIdx) {
            this.list[foundTaskIdx].taskDescription = newDescription;
        },
        removeTaskByDescription(key) {
            this.list.forEach((task, idx) => {
                if (task.taskDescription.toLowerCase() === key.toLowerCase()) {
                    this.list.splice(idx, 1);
                }
            })
        }
    }
    return Object.assign(Object.create(proto), {
        listName,
        list
    });
}
export {
    createTask,
    createToDoList
};