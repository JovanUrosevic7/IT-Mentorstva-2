import { ApiParametersInterface } from "../interfaces/ApiParametersInterface"

const API_KEY = "450e8dbe"
const API_URL = "http://www.omdbapi.com/"

// https://www.omdbapi.com/?i=tt3896198&apikey=450e8dbe
// http://www.omdbapi.com/?t=avengers+age+of+ultron&y=2015

export function buildUrl(params: ApiParametersInterface[]): void{

    let searchParams = ""
    
    params.forEach(param => {
        searchParams += `${param.key}=${param.value}&`
        
    })

    const url = API_URL

    console.log(url+"?"+searchParams+"apikey="+API_KEY);
    

}

