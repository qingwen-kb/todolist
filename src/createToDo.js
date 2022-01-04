import { format, formatDistanceToNowStrict } from "date-fns";

function createTask(userInput) {
  const { taskDescription, dueDate } = userInput;
  let isDone = false;
  let inputDate = new Date(dueDate);

  const dayFromNow = formatDistanceToNowStrict(inputDate, {
    unit: "day",
    roundingMethod: "ceil",
    addSuffix: true,
  });
  const formatDate = `${format(inputDate, "do MMM (E)")}`;

  const proto = {
    type: "task",
    toggleDone() {
      return (this.isDone = !this.isDone);
    },
    isNotDone() {
      return (this.isDone = false);
    },
  };
  return Object.assign(Object.create(proto), {
    taskDescription,
    formatDate,
    dayFromNow,
    isDone,
  });
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
      });
    },
  };
  return Object.assign(Object.create(proto), {
    listName,
    list,
  });
}
export { createTask, createToDoList };
