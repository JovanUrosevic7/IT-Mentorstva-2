import { areaSelectHandler } from "../handlers/areaSelectHandler"
import { categorySelectHandler } from "../handlers/categorySelectHandler"
import { ingredientSelectHandler } from "../handlers/ingredientSelectHandler"
import { searchMealsHandler } from "../handlers/searchMealsHandler"


export function hookSelectEvents(){

    
    const searchMeal = document.getElementById("searchMeal") as HTMLButtonElement

    

    // categorySelect.addEventListener("change", categorySelectHandler)
    // ingredientSelect.addEventListener("change", ingredientSelectHandler)
    // areaSelect.addEventListener("change", areaSelectHandler)
    searchMeal.addEventListener("click", searchMealsHandler)
}



