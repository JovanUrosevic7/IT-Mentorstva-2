let params = new URLSearchParams(window.location.search)
let recipeId = params.get("id")

let recipeElement = document.querySelector("#recipes")

fetch("https://dummyjson.com/recipe/"+recipeId)
.then(response => response.json())
.then(function(data){
    let recipeTitle = document.createElement("h1")
    recipeTitle.innerText = data.name
    
    recipeElement.append(recipeTitle)
})