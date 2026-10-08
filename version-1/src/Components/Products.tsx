
interface PhonesInterface {
    [phone: string]: number
}


const phones = {
    "Iphone 14": 1200, 
    "Iphone 15": 1300,
    "Samsung S23 Ultra": 1400

}



function Products({tax}): PhonesInterface {




    return (

        <>
           {Object.entries(phones).map(([phone, price]) => {
                return <p>{phone} - {price}, with tax: {CalculateTax(price, tax)}</p>
           })}
        </>
  

    )
}



function CalculateTax(priceProducts,taxProduct): number{

    return priceProducts * ((100 +  taxProduct) / 100 )

}



export default Products