// api/register

import { addProduct } from "@/app/src/services/productService";


export default async function handler(req, res) {

    addProduct(req.body.title,req.body.description, req.body.price);
    // console.log(req.body);
    
    
    res.status(200).json({
        message: "success"
    })
}