const form = document.querySelector(".add-task");
const entry = document.getElementById("entry");



function addTask() {
    let task = entry.value;
    console.log(task);
}

// submit form
form.addEventListener("submit", addTask);