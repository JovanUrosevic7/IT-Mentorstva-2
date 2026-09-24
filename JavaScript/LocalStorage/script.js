document.querySelector("#loginBtn").addEventListener("click", () => {

    let name = document.querySelector("#nameInput").value.toLowerCase()
    let password = document.querySelector("#passwordInput").value

    if(name !== "admin" && password !== "12345"){
        alert("Niste uneli dobre podakte")
    }else{
        localStorage.setItem("loggedIn", true)
    }

})