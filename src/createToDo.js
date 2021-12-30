function createTask(userInput) {
    let status = false;
    const proto = {
        type: "task",
        setDone() {
            return this.isDone = true;
        },
        setNotDone() {
            return this.isDone = false;
        }
    }
    return Object.assign(Object.create(proto), {
        task: userInput,
        isDone: status,

    })
}

export default function createToDoList(database, name) {
    let list = [];
    database.forEach((input) => {
        list.push(createTask(input));
    })

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
        printTasks() {
            for (let task of this.list) {
                console.log(task);
            }
        },
        printNotDoneTask() {
            for (let task of this.list) {
                if (!task.isDone) {
                    console.log(task);
                }
            }
        },
        addTask(input) {
            return this.list.push(createTask(input));
        },
        removeTaskByTitle(key) {
            this.list.forEach((task, idx) => {
                if (task.task.title.toLowerCase() === key.toLowerCase()) {
                    this.list.splice(idx, 1);
                }
            })
        }

    }
    return Object.assign(Object.create(proto), {
        name,
        list
    });
}