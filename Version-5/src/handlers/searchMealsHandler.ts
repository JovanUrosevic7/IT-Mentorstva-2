import {  getMealByCategoryOrArea, getMealsByIngredient } from "../services/mealDbServices"

export async function searchMealsHandler() {

    const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement
    const ingredientSelect = document.getElementById("ingredientSelect") as HTMLSelectElement
    const areaSelect = document.getElementById("areaSelect") as HTMLSelectElement

    const ingredientArray = Array.from(ingredientSelect.selectedOptions).map(option => option.value)
    
    console.log(ingredientArray);
    
    const responseCategory = await getMealByCategoryOrArea({data:{param: "c", value: categorySelect.value}})
    const responseArea = await getMealByCategoryOrArea({data:{param: "a", value: areaSelect.value}})
    const responseIngredients = await getMealsByIngredient(ingredientArray)
        
    console.log(responseCategory);
    console.log(responseArea);
    
    console.log(responseIngredients);
    
}


