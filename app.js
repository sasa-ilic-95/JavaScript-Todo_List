// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todosFilter = document.querySelector(".filter-todo");

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todosFilter.addEventListener("change", filter);
document.addEventListener("DOMContentLoaded", () => {
    getTodos();
});

//Functions
function addTodo(e) {
    e.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Todo LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    // ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Clear todo input
    todoInput.value = "";
    // CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // APPEND TO LIST
    todoList.appendChild(todoDiv);
}

function deleteCheck(e) {
    const item = e.target;

    switch (item.className) {
        case "complete-btn":
            item.parentElement.classList.toggle("completed");
            item.nextSibling.classList.toggle("disabled");
            break;
        case "trash-btn":
            //Animation
            item.parentElement.classList.add("fall");

            deleteFromTodos(item);
            item.parentElement.addEventListener("transitionend", function () {
                item.parentElement.remove();
            });
            break;
    }
}

function filter(e) {
    const type = e.target[[e.target.selectedIndex]].value;
    const todos = Array.from(todoList.children);
    todos.forEach(function (todo) {
        switch (type) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteFromTodos(todo) {
    let todos;
    const text = todo.parentElement.children[0].innerText;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.splice(todos.indexOf(text), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach((todo) => {
        // Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // Todo LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // CHECK MARK BUTTON
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        // TRASH BUTTON
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // APPEND TO LIST
        todoList.appendChild(todoDiv);
    });
}
