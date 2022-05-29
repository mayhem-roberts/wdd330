let todos = [];

class Todo {
    constructor(elementId) {
        this.parentElement = document.getElementById(elementId);
    }

    addTodo = () => {
        // create div element for todo item and assign clas name todo
        const div = document.createElement("div")
        div.classList.add("todo");
        // create list item and assign class name todo-item
        const li = document.createElement("li");
        li.innerText = todoInput.value;
        li.classList.add("todo-item");
        div.appendChild(li);
        // create delete button and assign class name delete-todo
        const button = document.createElement("button");
        button.innerText = "x";
        button.classList.add("delete");
        div.appendChild(button);

    // append to todo list
    todoList.appendChild(div);
        const newTodo = {
            id: new Date(),
            content: todoInput.value,
            completed: false
        }
        todos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos))

        // clear the input value
        todoInput.value = "";
    };

    dispalyTodos = () => {
        if(localStorage.getItem("todos") === null) {
            todos = [];
        }else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.forEach(function(todo){
            // create div element for todo item and assign clas name todo
            const div = document.createElement("div")
            div.classList.add("todo");
            // create list item and assign class name todo-item
            const li = document.createElement("li");
            li.innerText = todo.content;
            li.classList.add("todo-item");
            div.appendChild(li);
            // create delete button and assign class name delete-todo
            const button = document.createElement("button");
            button.innerText = "x";
            button.classList.add("delete");
            div.appendChild(button);
        
            // append to todo list
            todoList.appendChild(div);
        });
    };

    completeTodo = (item) => {
        if(item.classList[0] === "todo-item") {
            const todo = item.parentElement;
            todo.classList.toggle("complete");
        }
    };

    deleteTodo = (item) => {
        if(localStorage.getItem("todos") === null) {
            todos = [];
        }else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        if(item.classList[0] === "delete") {
            const todo = item.parentElement;
            todo.remove();
        }  
    };

}

// 
const toDos = new Todo("todo-list");

// selectors
const submitButton = document.getElementById("submit");
const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".todo-input");
const todoItem = document.getElementsByClassName("todo-item");
const deleteButton = document.querySelector("delete");

// event listeners
document.addEventListener("DOMContentLoaded", () => {
    toDos.dispalyTodos();
});

// add new item to todo list
submitButton.addEventListener("click", (event) => {
    // stop form from submitting
    event.preventDefault();
    // call add function
    toDos.addTodo();
});

todoList.addEventListener("click", (event) => {
    const item = event.target;
    toDos.deleteTodo(item);
    toDos.completeTodo(item);
});