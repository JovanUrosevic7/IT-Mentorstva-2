import { areaSelectHandler } from "../handlers/areaSelectHandler"
import { categorySelectHandler } from "../handlers/categorySelectHandler"
import { ingredientSelectHandler } from "../handlers/ingredientSelectHandler"
import { searchMealsHandler } from "../handlers/searchMealsHandler"


export function hookSelectEvents(){

    const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement
    const ingredientSelect = document.getElementById("ingredientSelect") as HTMLSelectElement
    const areaSelect = document.getElementById("areaSelect") as HTMLSelectElement
    const searchMeal = document.getElementById("searchMeal") as HTMLButtonElement

    categorySelect.addEventListener("change", categorySelectHandler)
    ingredientSelect.addEventListener("change", ingredientSelectHandler)
    areaSelect.addEventListener("change", areaSelectHandler)
    searchMeal.addEventListener("clikc", searchMealsHandler)
}



