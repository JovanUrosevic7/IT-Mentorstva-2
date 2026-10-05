

function getFirst<T>(items: T[]): T | undefined{
    return items[0]
}

const numbers = [1,2,3,4,5]

const userInfo: Record<string, any> = {
    name: "Nikola",
    age: 16,
    roles: ["admin", "user"]
}

type Role = "admin" | "editor" | "guest"

const permissions: Record<Role, boolean> = {

    admin: true,
    editor: false,
    guest: false

}



