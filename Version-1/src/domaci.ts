
type CurrencyType = "RSD" | "EUR"
type NameFormat = `${string} ${string}`

const orders: OrderInterface[] = []

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


function addOrder(name: NameFormat, locationString: string, zip: number, productName: string, amount: number, currency: CurrencyType){

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


const singleOrder = addOrder("Uros Mikic","Bograd Srbija",11000,"Monitor",2, "EUR")
const secondOrder = addOrder("Mihajlo Katic","Bograd Srbija",11000,"Monitor",2, "EUR")

orders.push(singleOrder, secondOrder)
    

function listOrders(orders: OrderInterface[]): void{

    orders.forEach(function(a,b){
        console.log(a,b);
        
    })
    
}

listOrders(orders)
