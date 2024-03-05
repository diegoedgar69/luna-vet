const { ipcRenderer } = require("electron");

const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");


taskForm.addEventListener("submit", e => {
    e.preventDefault();
    const user = {
        name: taskName.value,
        description: taskDescription.value
    }
    ipcRenderer.send("new-user", user)
    taskForm.reset();
})

ipcRenderer.on("new-user-created", (e, args) =>{
    const result = JSON.parse(args)
})


ipcRenderer.send("get-users");

ipcRenderer.on("get-users", (e, args) =>{
    const result = JSON.parse(args)
    console.log(result)
})