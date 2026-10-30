import { loginUser } from '@/app/src/services/productService'
import React from 'react'

function handler(req,res) {

    loginUser(req.body.username, req.body.password)

    
    res.status(200).json({message:"success"})

}

export default handler









