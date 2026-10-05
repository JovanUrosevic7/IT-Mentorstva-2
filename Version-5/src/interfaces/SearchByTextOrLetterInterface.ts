import { ApiUrlInterface } from "./ApiUrlInterface";

export interface SearchByTextOrLetterInterface extends ApiUrlInterface{

    data: {params: "s" | "f", value: string}

}