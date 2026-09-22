let deleteBtn = document.querySelector("#deleteBtn")

for(let i=18; i<=100;i++){
    let optionElement = document.createElement("option")
    optionElement.innerText = i
    document.querySelector("#selectAges").append(optionElement)
}

document.querySelector("#registerBtn").addEventListener("click", function(){
    let usernameInput = document.querySelector("#usernameInput").value
    let passwordInput = document.querySelector("#passwordInput").value
    let selectAges = document.querySelector("#selectAges").value

    console.log(usernameInput, passwordInput, selectAges);

    if(usernameInput.trim() == "" && passwordInput.trim() == ""){
        alert("Please enter username and password")
        return
    }

    register(usernameInput, passwordInput, selectAges)

})

function register(username, password, age){

    fetch("https://dummyjson.com/users/add",{
        method: "POST",
        header:{"Content-Type":"application/json"},
        body: JSON.stringify({
            firstName: username,
            password: password,
            age:age
        })
    })
    .then(response => response.json())
    .then(function(data){
        console.log(data)
        deleteBtn.setAttribute("userId", data.id)
    })

    deleteBtn.style.display = "block"
}

deleteBtn.addEventListener("click",deleteUser)

function deleteUser(){

    let userId = deleteBtn.getAttribute("userId")
    console.log(userId);
    
    fetch("https://dummyjson.com/users/"+userId,{
        method: "DELETE"
    })
    .then(response => response.json())
    .then(function(data){
        console.log(data);
        
    })

}

fetch("https://dummyjson.com/auth/login",{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 30,
    })
})
.then(response => response.json())
.then(function(data){
    console.log(data);
    
})