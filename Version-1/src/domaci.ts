
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


function addOrder(
    
    name: NameFormat, 
    locationString: string, 
    zip: number, 
    productName: string, 
    amount: number, 
    currency: CurrencyType

):OrderInterface|never {

    const splitName = name.split(" ")
    const splitLocation = locationString.split(" ")

    if(splitName.length > 2 || splitLocation.length > 2){
        throw new Error("Greska kod imena ili lokacije")
    }

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

function listOrders(orders: OrderInterface[]): void{

    const ordersDiv: HTMLElement = document.querySelector("#listOrders")
    ordersDiv.innerHTML = ""

    orders.forEach(item => {    
            const singleOrder: HTMLElement = document.createElement("div")
            const singleOrderTitle: HTMLElement = document.createElement("h1")
            const paragraphOrder: HTMLElement = document.createElement("p")
            const secondParagraphOrder: HTMLElement = document.createElement("p")
            const spanOrder: HTMLElement = document.createElement("span")


            singleOrderTitle.textContent = item.firstName + " " + item.lastName

            singleOrder.append(singleOrderTitle)

            ordersDiv.append(singleOrder)
            


        }
    );

}


function searchOrder(orderName: string, orderList: OrderInterface[]): void{

    const orderNameLower = orderName.toLocaleLowerCase()

    const filteredOrders = orderList.filter(order => {

        if(order.productName.toLocaleLowerCase() === orderNameLower){
            console.log(order);
            return order
        }
    })

    listOrders(filteredOrders)

}


const singleOrder = addOrder("Uros Mikic","Bograd Srbija",11000,"Kompjuter",2, "EUR")
const secondOrder = addOrder("Mihajlo Katic","Bograd Srbija",11000,"Monitor",2, "EUR")

orders.push(singleOrder, secondOrder)

console.log(orders);

listOrders(orders)

searchOrder("Monitor", orders)