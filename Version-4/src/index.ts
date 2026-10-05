

// function getFirst<T>(items: T[]): T | undefined{
//     return items[0]
// }

// const numbers = [1,2,3,4,5]

// const userInfo: Record<string, any> = {
//     name: "Nikola",
//     age: 16,
//     roles: ["admin", "user"]
// }

// type Role = "admin" | "editor" | "guest"

// const permissions: Record<Role, boolean> = {

//     admin: true,
//     editor: false,
//     guest: false

// }

// interface Property{
//     name: string,
//     address: string,
//     city: string,
//     price: number
// }

// const Houses: Partial<Property>[] = [

//     {
//         name: "Velika vila",
//         address: "Neka ulica 12",
//         city: "Belgrade",
//         price: 500000
//     },

    
//     {
//         name: "Stan",
//         address: "Neka ulica 24a",
//         city: "Kragujevac",
//     }
// ]


type Role = "admin" | "editor" | "guest"

const permissions:Partial <Record<Role, boolean>> = {

    admin: true,
    editor: false,

}


type Fileds = "username" | "email" | "password"

const form: Partial<Record<Fileds, any>> = {

    email: 12345

}

console.log(form);
