


interface Bank { 

    amount: number,
    accountName: string,
    blocked?: boolean // ? -> optional

}

const myAccount: Required <Bank> = {

    amount: 50000,
    accountName: "Marko",
    blocked: false 
    

}


