import axios from "axios"
import { ApiUrlInterface } from "../interfaces/ApiUrlInterface"
import { MealsResponseInterface } from "../interfaces/MealInterface"
import { SearchByTextOrLetterInterface } from "../interfaces/SearchByTextOrLetterInterface"
import { SingleProductSearchInterface } from "../interfaces/SingleProductSearchInterface"
import { GetCategoriesInterface } from "../interfaces/GetCategoriesInterface"
import { CategoriesInterface } from "../interfaces/CategoriesInterface"
import { BuilUrlInterface } from "../interfaces/BuildUrlInterface"


const API_URL = "https://www.themealdb.com/api/json/v1/1/"


export function buildApiUrl(endpoint: string ,data: BuilUrlInterface): string {
    
    return API_URL + endpoint + "?" + data.data.param + "=" + data.data.value

}

async function callApi(
        endpoint: string,
        data: SingleProductSearchInterface | SearchByTextOrLetterInterface | GetCategoriesInterface
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


export async function getMealCategories(data: GetCategoriesInterface): Promise<CategoriesInterface[]> {
    return await callApi("list.php", data)
}