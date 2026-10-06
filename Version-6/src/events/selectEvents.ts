import { areaSelectHandler } from "../handlers/areaSelectHandler"
import { categorySelectHandler } from "../handlers/categorySelectHandler"
import { ingredientSelectHandler } from "../handlers/ingredientSelectHandler"


export function hookSelectEvents(){

    const categorySelect = document.getElementById("categorySelect") as HTMLSelectElement
    const ingredientSelect = document.getElementById("ingredientSelect") as HTMLSelectElement
    const areaSelect = document.getElementById("areaSelect") as HTMLSelectElement


    categorySelect.addEventListener("change", categorySelectHandler)
    ingredientSelect.addEventListener("change", ingredientSelectHandler)
    areaSelect.addEventListener("change", areaSelectHandler)
}



