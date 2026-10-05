import axios from "axios"
import { ApiUrlInterface } from "../interfaces/ApiUrlInterface"
import { MealsResponse } from "../interfaces/MealInterface"


const API_URL = "https://www.themealdb.com/api/json/v1/1/"


export function buildApiUrl(data: ApiUrlInterface): string {

    const queryParams = data.data.map(p => `${encodeURIComponent(p.param)}=${encodeURIComponent(p.value)}`).join("&") 
    
    const url = API_URL + data.endpoint + "?" + queryParams    

    return url

}


export async function getMealById(data: ApiUrlInterface): Promise<MealsResponse> {

    const url = buildApiUrl(data)

    const response = await axios.get(url)

    return response.data.meals
    

}









