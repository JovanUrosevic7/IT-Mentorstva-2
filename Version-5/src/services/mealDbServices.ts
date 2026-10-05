import { ApiUrlInterface } from "../interfaces/ApiUrlInterface"


const API_URL = "https://www.themealdb.com/api/json/v1/1/"


export function buildApiUrl(data: ApiUrlInterface): string {

    const queryParams = data.data.map(p => `${encodeURIComponent(p.param)}=${encodeURIComponent(p.value)}`).join("&") 
    
    const url = API_URL + data.endpoint + "?" + queryParams    

    return url

}









