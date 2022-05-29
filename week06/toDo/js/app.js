
//Selectors
const todoInput = document.querySelector(".todo-input");
const submitButton = document.getElementById("submit");
const todoList = document.querySelector(".todo-list");
const deleteButton = document.querySelector("delete");

//Event Listeners
submitButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);

//Functions
function addTodo(event) {
    // stop form from submitting
    event.preventDefault();
    // create div element for todo item and assign clas name todo
    const div = document.createElement("div")
    div.classList.add("todo");
    // create list item and assign class name todo-item
    const li = document.createElement("li");
    li.innerText = todoInput.value;
    li.classList.add("todo-item");
    div.appendChild(li);
    // create input checkbox and assign class name complete
    //const input = document.createElement("input");
    //input.type = "checkbox";
    //input.classList.add("checkbox")
    //div.appendChild(input);
    // create delete button and assign class name delete-todo
    const button = document.createElement("button");
    button.innerText = "x";
    button.classList.add("delete");
    div.appendChild(button);

    // append to todo list
    todoList.appendChild(div);
    // clear the input value
    todoInput.value = "";

}

function deleteTodo(event) {
    const item = event.target;
        if(item.classList[0] === "delete") {
            console.log("delete")
        }
}