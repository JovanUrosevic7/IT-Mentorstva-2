import { getMealByCategory } from "../services/mealDbServices"

export async function searchMealsHandler() {

    const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement
    const ingredientSelect = document.getElementById("ingredientSelect") as HTMLSelectElement
    const areaSelect = document.getElementById("areaSelect") as HTMLSelectElement

    const selectIngredients = Array.from(ingredientSelect.selectedOptions).map(option => option.value)

    const response = await getMealByCategory({data:{param: "c", value: categorySelect.value}})
    
    console.log(response);
    
}


