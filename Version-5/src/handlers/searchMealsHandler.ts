import {  getMealByCategoryOrArea } from "../services/mealDbServices"

export async function searchMealsHandler() {

    const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement
    const ingredientSelect = document.getElementById("ingredientSelect") as HTMLSelectElement
    const areaSelect = document.getElementById("areaSelect") as HTMLSelectElement

    const selectIngredients = Array.from(ingredientSelect.selectedOptions).map(option => option.value)
    

    const responseCategory = await getMealByCategoryOrArea({data:{param: "c", value: categorySelect.value}})
    const responseArea = await getMealByCategoryOrArea({data:{param: "a", value: areaSelect.value}})
        
    console.log(responseCategory);
    console.log(responseArea);
    
    console.log(selectIngredients);
    
}


