const inputTask = document.querySelector('#description-task');
const addBtn = document.querySelector('#add-task-btn');
const todoWrap = document.querySelector('.todos-wrapper');

let tasks = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

addBtn.addEventListener('click', () => {
    if (inputTask.value) {
        tasks.unshift(new Task(inputTask.value))
        updateLocal();
        tasksItems();
        inputTask.value = '';
    }
})

inputTask.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        if (inputTask.value) {
            tasks.unshift(new Task(inputTask.value));
            updateLocal();
            tasksItems();
            inputTask.value = '';
        }
    }
})

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


if (!localStorage.tasks) {
    tasks = []
} else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}

const createTemplate = (task, index) => {
    return `
 <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
            </div>
        </div>
 `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true);

    tasks = [...activeTasks, ...completedTasks]
}

let todoItemElems = [];

const tasksItems = () => {
    todoWrap.innerHTML = '';
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todoWrap.innerHTML += createTemplate(item, index);
        })
        todoItemElems = document.querySelectorAll('.todo-item')
    }
}
tasksItems();

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed) {
        todoItemElems[index].classList.add('checked')
    } else {
        todoItemElems[index].classList.remove('checked')
    }
    updateLocal();
    tasksItems();
}

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateLocal();
    tasksItems();
}