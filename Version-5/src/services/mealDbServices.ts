import axios from "axios"
import { ApiUrlInterface } from "../interfaces/ApiUrlInterface"
import { MealsResponseInterface } from "../interfaces/MealInterface"
import { SearchByTextOrLetterInterface } from "../interfaces/SearchByTextOrLetterInterface"
import { SingleProductSearchInterface } from "../interfaces/SingleProductSearchInterface"
import { GetCategoriesInterface } from "../interfaces/GetCategoriesInterface"
import { CategoriesInterface } from "../interfaces/CategoriesInterface"
import { BuilUrlInterface } from "../interfaces/BuildUrlInterface"
import { SearchByCategoryInterface, SearchByCategoryOrAreaInterface } from "../interfaces/SearchByCategoryInterface"


const API_URL = "https://www.themealdb.com/api/json/v1/1/"


export function buildApiUrl(endpoint: string ,data: BuilUrlInterface | null): string {
    if(data !== null){
        return API_URL + endpoint + "?" + data.data.param + "=" + data.data.value
    }

    return API_URL + endpoint

}

async function callApi(
        endpoint: string,
        data: SingleProductSearchInterface | SearchByTextOrLetterInterface | GetCategoriesInterface | null
    )
        : Promise<MealsResponseInterface[]> 
    
{
        const url = buildApiUrl(endpoint, data)

        const response = await axios.get(url)

        return response.data
}


export async function getMealByNameOrFirstLetter(data:SearchByTextOrLetterInterface): Promise<MealsResponseInterface[]> {
    
    return await callApi("search.php", data)
}


export async function getMealById(data: SingleProductSearchInterface): Promise<MealsResponseInterface[]> {

    return await callApi("lookup.php", data)

}

export async function getMealByCategoryOrArea(data: SearchByCategoryOrAreaInterface): Promise<MealsResponseInterface[]>{

    return await callApi("filter.php", data)

}


export async function getMealCategories(data: GetCategoriesInterface): Promise<CategoriesInterface[]> {
    return await callApi("list.php", data)
}


export async function getRandomMeal(amount: number): Promise<MealsResponseInterface[]>{

    const mealPromises = []

    for(let i = 0; i < amount; i++){

        mealPromises.push(callApi("random.php", null))

    }

    const mealsArray = await Promise.all(mealPromises)    
    return mealsArray.flatMap(response => response.meals)

}

