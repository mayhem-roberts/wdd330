//import Todo from "./todo";

let toDoList = [];

class Todo {
    constructor(elementId) {
        this.parentElement = document.getElementById(elementId);
    }

    addTask = () => {
        // get input from entry box
        let entryText = document.getElementById('entry').value;

        // create a new task: id, content, and completion status
        const newTask = {
            id: new Date(),
            content: entryText,
            completed: false
        };


        toDoList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(toDoList));
    }

    displayTask = () => {
        let toDo = localStorage.getItem("tasks")
        toDoList = JSON.parse(toDo);

        //console.log(toDoList[1].content);

        toDoList.forEach(index => {
            console.log(index.content);
            let li = document.createElement("li");

            li.textContent = index.content;
            document.getElementById("tasks").appendChild(li);
        });
        

    }

}

const toDos = new Todo("tasks")
const submitButton = document.getElementById("submitButton");

window.addEventListener("load", () => {
    toDos.displayTask();
});
// submit form
submitButton.addEventListener("click", (event) => {
    console.log("submit")
    event.preventDefault();
    toDos.addTask();
});