import { buildApiUrl, getMealById, getMealCategories } from "./services/mealDbServices";


// const testUrl = buildApiUrl({data: [{param: "s", value: "Arrabiata"}]})

const x = await getMealById({data: [{param: "i", value: "52772"}]})

const r = await getMealCategories({data: [{param: "a", value: "list"}]})

// console.log(testUrl);
// console.log(x);
console.log(r);



