// api/search

import { searchProductByQuery } from "@/app/src/services/productService";

export default async function handler(req, res) {
 
    if(!req.query.q){
        return res.status(400).json({message: "Niste prosledili parametar za pretragu"});
    }

    const data = await searchProductByQuery(req.query.q)
    // console.log(data);
    
    res.status(200).json(data)
}