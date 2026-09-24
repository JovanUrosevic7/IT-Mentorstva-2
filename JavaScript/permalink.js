let params = new URLSearchParams(window.location.search)
let recipeId = params.get("id")

let recipeElement = document.querySelector("#recipe")
let selectTag = document.querySelector("#selectTag")


fetch("https://dummyjson.com/recipe/"+recipeId)
.then(response => response.json())
.then(function(data){
    let recipeTitle = document.createElement("h1")
    recipeTitle.innerText = data.name
    
    recipeElement.append(recipeTitle)
})

fetch(`https://dummyjson.com/recipes/tags`)
.then(response => response.json())
.then(function(data){

  for(let tag of data){ 
    let recipeOption = document.createElement("option")
    recipeOption.innerHTML = tag
    recipeOption.value = tag
    selectTag.append(recipeOption)
    
  }

})

selectTag.addEventListener("change", function() {

    window.location.href = "index.html?category=" + this.value

})