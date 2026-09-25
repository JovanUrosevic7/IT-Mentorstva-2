
const valueLS = localStorage.getItem("loggedIn")

if(!valueLS){

    document.querySelector("form").style.display = "block"
} 

else {
    document.querySelector("form").style.display = "none"
    document.querySelector("#loggedInData").style.display = "block"
}

document.querySelector("#loginBtn").addEventListener("click", () => {

    let name = document.querySelector("#nameInput").value.toLowerCase()
    let password = document.querySelector("#passwordInput").value

    if(name !== "admin" && password !== "12345"){
        alert("Niste uneli dobre podakte")
    }else{
        localStorage.setItem("loggedIn", true)
        window.location.reload()
    }

})

document.querySelector("#logoutBtn").addEventListener("click", () => {

    localStorage.removeItem("loggedIn")
    window.location.reload()

})




