import { buildUrl, callOmdbApi } from "./services/omdbApiServices";


const response = await callOmdbApi([
    {
        key: "i",
        value: "tt3896198"
    }
])


console.log(response);
