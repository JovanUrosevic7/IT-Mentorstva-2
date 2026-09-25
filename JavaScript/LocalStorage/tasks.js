const valueLS = localStorage.getItem("loggedIn")

if(valueLS === null){
    window.location.href = "index.html"
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

document.querySelector("#addTaskBtn").addEventListener("click", () => {

    const name = document.querySelector("#taskName").value
    const date = new Date()
    const id = date.getTime()

    tasks.push({
        id: id,
        name: name
    })    

    const jsonsTasks = JSON.stringify(tasks)

    localStorage.setItem("tasks", jsonsTasks)

    createTask()

    document.querySelector("#taskName").value = ""


})

function createTask() {



    let taskList = document.querySelector("#taskList")
    taskList.innerHTML = ""

    if(tasks.length >= 1){

        for(let task of tasks){

            let singleTask = document.createElement("div")

            let name = document.createElement("p")
            name.innerHTML = task.name

            let deleteTask = document.createElement("button")
            deleteTask.innerHTML = "Delete task"
            deleteTask.setAttribute("data-task-id", task.id)
            deleteTask.addEventListener("click", () => {
                tasks = tasks.filter(taskFilter => taskFilter.id !== task.id)
                createTask()
                localStorage.setItem("tasks", JSON.stringify(tasks))
            })


            singleTask.classList = "singleTask"
            singleTask.append(name, deleteTask)

            taskList.append(singleTask)
        }
    }

}
