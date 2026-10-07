import { hookSelectEvents } from "./events/selectEvents"
import { fillSelectWithOptions } from "./helpers/htmlSelectHelper"
import { showMeals } from "./helpers/showMealsHelpers"
import { getMealCategories, getRandomMeal } from "./services/mealDbServices"



async function main(){

    hookSelectEvents()

    const categories =await getMealCategories({
        data: {param: "c", value: "list"}
    })

    const ingredients =await getMealCategories({
        data: {param: "i", value: "list"}
    })

    const areas =await getMealCategories({
        data: {param: "a", value: "list"}
    })


    fillSelectWithOptions("categorySelect", categories.meals)
    fillSelectWithOptions("ingredientSelect", ingredients.meals)
    fillSelectWithOptions("areaSelect", areas.meals)


    const randomMeals = await getRandomMeal(3)
    
    showMeals("mealHolder", randomMeals)
    
}

main()

