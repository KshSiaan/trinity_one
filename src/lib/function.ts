import { apiConfig } from "./config";



export function imgBuilder(x:string) {
    return `${apiConfig.base}${x}`;
}