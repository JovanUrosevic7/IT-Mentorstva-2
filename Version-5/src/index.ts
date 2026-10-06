import { buildApiUrl, getMealById, getMealCategories } from "./services/mealDbServices";


const testUrl = buildApiUrl({endpoint: "search.php", data: [{param: "s", value: "Arrabiata"}]})

const x = await getMealById({endpoint: "lookup.php", data: [{param: "i", value: "52772"}]})

const r = await getMealCategories({endpoint: "list.php", data: [{param: "a", value: "list"}]})

console.log(x);
console.log(r);
