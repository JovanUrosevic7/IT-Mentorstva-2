const mealDbAPI = "https://www.themealdb.com/api/json/v1/1/"

const data = await getMealData("categories.php")
// console.log(data);


let categories = data.categories
let selectElemet = document.querySelector("#categories")
let mealsElement = document.querySelector("#meals")

let popup = document.querySelector("#popup")

// console.log(categories);


for(let category of categories){
    let optionElement = document.createElement("option")
    optionElement.innerHTML = category.strCategory
    optionElement.value = category.strCategory

    selectElemet.append(optionElement)
    
}

selectElemet.addEventListener("change", async () => {

    mealsElement.innerHTML = ""


    const data = await getMealData("filter.php?c="+selectElemet.value)
    const meals = data.meals

    for(let meal of meals){

        let mealElement = document.createElement("div")
        mealElement.classList.add("singleMeal")
        // mealElement.style.height = "300px"

        let imgElement = document.createElement("img")
        let titleElement = document.createElement("h3")

        titleElement.innerHTML = meal.strMeal
        titleElement.style.width = "300px"
        titleElement.style.margin = "0"

        imgElement.src = meal.strMealThumb
        imgElement.style.width = "300px"
        

        mealElement.style.display = "flex"
        mealElement.style.flexDirection = "column"
        mealElement.style.justifyContent = "space-between"
        mealElement.style.gap = "10px"
        mealElement.append(titleElement, imgElement)

        mealsElement.append(mealElement)

        mealElement.addEventListener("click",async () => {
            popup.style.display = "block"
            
            const data = await getMealData("lookup.php?i="+meal.idMeal)
            
            document.querySelector("#recipeText").innerHTML = data.meals[0].strInstructions
            
            let cocktailData = await getCocktail("random.php")
            let cocktailName = cocktailData.drinks[0].strDrink
            let cocktailThumb = cocktailData.drinks[0].strDrinkThumb

            
            document.querySelector("#cocktailName").innerHTML = cocktailName 
            document.querySelector("#cocktailImg").setAttribute("src",cocktailThumb)  
        })

    }
    
})

let closeBtn = document.querySelector("#closeBtn")
closeBtn.addEventListener("click", () =>{
    popup.style.display = "none"
    

})

async function getMealData(endpoint) {

    const response = await fetch(mealDbAPI + endpoint)
    return await response.json()

}



async function getCocktail(endpoint) {

    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/" + endpoint)
    let data = await response.json()
    return data
    
}



