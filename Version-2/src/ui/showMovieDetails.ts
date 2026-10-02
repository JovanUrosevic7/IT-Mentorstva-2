import axios from "axios";
import { callOmdbApi } from "../services/omdbApiServices";


export async function showMovieDetails(imdbID: string){

    const response = await callOmdbApi([
        {key: "i", value: imdbID}
    ])

    console.log(response);
    
    

}




