let recipesDiv = document.querySelector("#recipes")
let selectRecipe = document.querySelector("#selectRecipe")
let params = new URLSearchParams(window.location.search)

let categoryParams = params.get("category")

if(categoryParams == null){
 
  fetch('https://dummyjson.com/recipes?limit=9&sortBy=name&order=asc')
  .then(response => response.json())
  .then(function(data){
    for(let recipe of data.recipes){
      appendCookingRecipe(recipe)
    }
    
  })

} else {
  let apiUrl = "https://dummyjson.com/recipes/tag/" + categoryParams

  fetch(apiUrl).then(response => response.json())
    .then(function(data){
      recipesDiv.innerHTML = ""
      for(let recipe of data.recipes){
        appendCookingRecipe(recipe)
        
      }
    })
}



fetch(`https://dummyjson.com/recipes/tags`)
.then(response => response.json())
.then(function(data){

  for(let tag of data){ 
    let recipeOption = document.createElement("option")
    recipeOption.innerHTML = tag
    recipeOption.value = tag
    selectRecipe.append(recipeOption)
    
  }

})

selectRecipe.addEventListener("change", function(){

  let apiUrl = "https://dummyjson.com/recipes/tag/" + this.value

  fetch(apiUrl).then(response => response.json())
    .then(function(data){
      recipesDiv.innerHTML = ""
      for(let recipe of data.recipes){
        appendCookingRecipe(recipe)
        
      }
    })

})

function appendCookingRecipe(recipe){

  let titleElement = document.createElement("h1")
  titleElement.append(recipe.name)

  let instructionsElement = document.createElement("ul")
  for(let instruction of recipe.instructions){
    let instructionElement = document.createElement("li")
    instructionElement.innerText = instruction
    instructionsElement.append(instructionElement)

  }

  let permalink = document.createElement("a")
  permalink.innerText = "Show recipe"
  permalink.href = "permalink.html?id=" + recipe.id

  let divElement = document.createElement("div")
  divElement.append(titleElement,instructionsElement, permalink)

  recipesDiv.append(divElement)
  return recipesDiv

}