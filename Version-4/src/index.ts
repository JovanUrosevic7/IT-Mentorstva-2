


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

function createBankAccount(data: Required<Bank>){

    return {
        accountName: data.accountName,
        amount: data.amount,
        blockked: data.blocked
    }

}


function updateBankAccount(data: Partial<Bank>){

    return {
        accountName: data.accountName ?? "Unknown",
        amount: data.amount ?? 0,
    }

}


interface UserInfo {

    name: string,
    email: string,
    age: number

}


function createUser(data: Required<UserInfo>){

    return{
        name: data.name,
        email: data.email,
        age: data.age
    }

}


function updateUser(data: Partial<UserInfo>){

    return{
        name: data.name
    }

}

type UserKey = keyof UserInfo

const user: UserInfo = {
    name: "Mihajlo",
    email: "mihajlo@gmail.com",
    age: 22
}

function getField <UserInfo, K extends keyof UserKey> (data: UserInfo, key: K): UserInfo[K] {
    return data[key]
}

console.log(getField(user, "email"));










