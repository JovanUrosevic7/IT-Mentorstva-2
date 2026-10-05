import { ApiPayloadInterface } from "./ApiPayloadInterface";

export interface ApiUrlInterface{

    endpoint: string,
    data: [ApiPayloadInterface, ...ApiPayloadInterface[]]

}




