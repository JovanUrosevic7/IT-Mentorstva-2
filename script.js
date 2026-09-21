let recipesDiv = document.querySelector("#recipes")
let selectRecipe = document.querySelector("#selectRecipe")


fetch('https://dummyjson.com/recipes?limit=9&sortBy=name&order=asc')
.then(response => response.json())
.then(function(data){
  for(let recipe of data.recipes){
    
    // console.log(recipe);

    appendCookingRecipe(recipe)
  }
  
})

fetch(`https://dummyjson.com/recipes/tags`)
.then(response => response.json())
.then(function(data){

  for(let tag of data){

    let linkHref = document.createElement("a")
    linkHref.href = "index.html" 

    let recipeOption = document.createElement("option")
    recipeOption.value = tag
    linkHref.innerText = tag
    recipeOption.append(linkHref)

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