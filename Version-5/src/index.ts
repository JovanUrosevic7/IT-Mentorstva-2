import { buildApiUrl } from "./services/mealDbServices";


const testUrl = buildApiUrl({endpoint: "search.php", data: [{param: "g", value: "Arrabiata"}]})

console.log(testUrl);
