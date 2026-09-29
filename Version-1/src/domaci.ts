
type CurrencyType = "RSD" | "EUR"

interface OrderInterface {

    firstName: string,
    lastName: string,
    city: string,
    country: string,
    zip: number,
    productName: string,
    amount: number,
    currency: CurrencyType

}


function addOrder(name: string, locationString: string, zip: number, productName: string, amount: number, currency: CurrencyType){

    const splitName = name.split(" ")
    const splitLocation = locationString.split(" ")

    return {

        firstName: splitName[0],
        lastName: splitName[1],
        city: splitLocation[0],
        country: splitLocation[1],
        zip: zip,
        productName: productName,
        amount: amount,
        currency: currency

    }
}


const singleOrder = addOrder("Marko Markovic","Bograd Srbija",11000,"Monitor",2, "EUR")

console.log(singleOrder);


