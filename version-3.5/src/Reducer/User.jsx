export const initialUserState = {

    username: null,
    money: null,
    isUserCreated: null

}

export const userReducer = (state, action) => {

    switch(action.type){
        case "SET_USERNAME":
            return {...state, username: action.payload}
        case "SET_MONEY": 
            return {...state, money: action.payload}
        case "SET_ISUSERCREATED":
            return {...state, isUserCreated: action.payload}
        default:
            return state
    }

}