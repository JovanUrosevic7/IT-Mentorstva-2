import axios from "axios"
import { ApiParametersInterface } from "../interfaces/ApiParametersInterface"
import { ApiResponseInterface } from "../interfaces/ApiResponseInterface"

const API_KEY = "450e8dbe"
const API_URL = "http://www.omdbapi.com/"

// https://www.omdbapi.com/?i=tt3896198&apikey=450e8dbe
// http://www.omdbapi.com/?t=avengers+age+of+ultron&y=2015

export function buildUrl(params: ApiParametersInterface[]): string{

    let searchParams = ""
    
    params.forEach(param => {
        searchParams += `${param.key}=${param.value}&`
        
    })

    const url = API_URL

    return url+"?"+searchParams+"apikey="+API_KEY
    

}



export async function callOmdbApi(param: ApiParametersInterface[]): Promise<ApiResponseInterface> {

    const url = buildUrl(param)

    return await axios.get(url)

}