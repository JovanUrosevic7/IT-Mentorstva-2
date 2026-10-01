import { ApiResponsesErrorInterface } from "./ApiResponsesErrorInterface";
import { ApiSuccessInterface } from "./ApiSuccessInterface";

export interface ApiResponseInterface {

    config: {},
    data: ApiResponsesErrorInterface | ApiSuccessInterface ,
    headers: {},
    request: {},
    status: string,
    statusText: string

}