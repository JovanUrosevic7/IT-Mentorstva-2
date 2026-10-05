


interface UserInfo{
    name: string,
    email: string,
    age: number
}

type UserKey = keyof UserInfo

const userData: UserInfo = {

    name: "Luka",
    email: "luka@gmail.com",
    age: 19

}

function getUserKeyValue(data: UserInfo, key: string){

    if(key in data){
        return data[key]
    }

    return null
}

function getUserKeyValue2 <UserInfo, K extends keyof UserKey> (data: UserInfo, key: K): UserInfo[K] {
    return data[key]
}


console.log(getUserKeyValue2(userData, "email"));



