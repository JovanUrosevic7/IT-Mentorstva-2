import { buildApiUrl, getMealById } from "./services/mealDbServices";


const testUrl = buildApiUrl({endpoint: "search.php", data: [{param: "s", value: "Arrabiata"}]})

const x = getMealById({endpoint: "lookup.php", data: [{param: "i", value: "52772"}]})

console.log(x);
