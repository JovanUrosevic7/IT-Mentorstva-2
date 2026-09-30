import { buildUrl } from "./services/omdbApiServices";


buildUrl([
    {
        key: "t",
        value: `avengers+age+of+ultron`
    
    },
    {
        key: "y",
        value: "2015"
    }
])