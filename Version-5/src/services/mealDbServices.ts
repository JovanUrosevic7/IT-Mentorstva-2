import axios from "axios"
import { ApiUrlInterface } from "../interfaces/ApiUrlInterface"
import { MealsResponseInterface } from "../interfaces/MealInterface"
import { SearchByTextOrLetterInterface } from "../interfaces/SearchByTextOrLetterInterface"
import { SingleProductSearchInterface } from "../interfaces/SingleProductSearchInterface"
import { GetCategoriesInterface } from "../interfaces/GetCategoriesInterface"
import { CategoriesInterface } from "../interfaces/CategoriesInterface"


const API_URL = "https://www.themealdb.com/api/json/v1/1/"


export function buildApiUrl(data: ApiUrlInterface): string {

    const queryParams = data.data.map(p => `${encodeURIComponent(p.param)}=${encodeURIComponent(p.value)}`).join("&") 
    
    const url = API_URL + data.endpoint + "?" + queryParams    

    return url

}

async function callApi(data: SingleProductSearchInterface | SearchByTextOrLetterInterface | GetCategoriesInterface): Promise<MealsResponseInterface[]> {
    const url = buildApiUrl(data)

    const response = await axios.get(url)

    return response.data.meals
}


export async function getMealByNameOrFirstLetter(data:SearchByTextOrLetterInterface): Promise<MealsResponseInterface[]> {
    
    return await callApi(data)
}



export async function getMealById(data: SingleProductSearchInterface): Promise<MealsResponseInterface[]> {

    return await callApi(data)

}



export async function getMealCategories(data: GetCategoriesInterface): Promise<CategoriesInterface[]> {
    return await callApi(data)
}