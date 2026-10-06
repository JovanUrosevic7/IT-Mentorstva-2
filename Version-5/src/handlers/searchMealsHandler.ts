
export function searchMealsHandler(): void{

    const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement
    const ingredientSelect = document.getElementById("ingredientSelect") as HTMLSelectElement
    const areaSelect = document.getElementById("areaSelect") as HTMLSelectElement

    const selectIngredients = Array.from(ingredientSelect.selectedOptions).map(option => option.value)

    console.log(categorySelect.value, selectIngredients, areaSelect.value);
    
}


