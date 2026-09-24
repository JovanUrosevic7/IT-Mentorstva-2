const mealDbAPI = "https://www.themealdb.com/api/json/v1/1/"

const response = await fetch(mealDbAPI + "categories.php")
const data = await response.json()


let categories = data.categories
let selectElemet = document.querySelector("#categories")
let mealsElement = document.querySelector("#meals")

console.log(categories);


for(let category of categories){
    let optionElement = document.createElement("option")
    optionElement.innerHTML = category.strCategory
    optionElement.value = category.strCategory

    selectElemet.append(optionElement)
    // console.log(category.strCategory);
    

}

selectElemet.addEventListener("change", async () => {

    mealsElement.innerHTML = ""

    const mealsAPI = mealDbAPI+"filter.php?c="+selectElemet.value;
    
    const response = await fetch(mealsAPI)
    const data = await response.json()
    const meals = data.meals

    for(let meal of meals){

        let divElement = document.createElement("div")
        divElement.classList.add("singleMeal")
        // divElement.style.height = "300px"

        let imgElement = document.createElement("img")
        let titleElement = document.createElement("h3")

        titleElement.innerHTML = meal.strMeal
        titleElement.style.width = "300px"
        titleElement.style.margin = "0"

        imgElement.src = meal.strMealThumb
        imgElement.style.width = "300px"
        

        divElement.style.display = "flex"
        divElement.style.flexDirection = "column"
        divElement.style.justifyContent = "space-between"
        divElement.style.gap = "10px"
        divElement.append(titleElement, imgElement)

        mealsElement.append(divElement)

    }
    
    

})

