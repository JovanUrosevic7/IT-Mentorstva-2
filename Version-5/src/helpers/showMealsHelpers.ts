import { MealsResponseInterface } from "../interfaces/MealInterface";


export function showMeals(parent: string, data: MealsResponseInterface[]): void{

    const parentElement = document.getElementById(parent) as HTMLElement

    data.forEach(meal => {

        const mealHolder = document.createElement("div") as HTMLDivElement

        const mealTitle = document.createElement("h3") as HTMLHeadElement
        mealTitle.textContent = meal.strMeal

        mealHolder.append(mealTitle)

        parentElement.append(mealHolder)

    })
}





