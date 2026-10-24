export default function handler(req, res) {
 
    if(!req.query.pretraga){
        res.status(400).json({message: "Niste prosledili parametar za pretragu"});
    }

    res.status(200).json({message: "Ovaj api radi"})
}