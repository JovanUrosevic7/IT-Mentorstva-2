export const INITIAL_CART_STATE = [];


function cartReducer(state, action) {

    switch(action.type){
        case "INIT_CART":{
            return action.payload
        }

        case "ADD_ITEM":{
            const product = action.payload
            const existingIndex = state.findIndex(item => item.id === product.id)

            if(existingIndex > -1){

                return state.map((item, index) => {

                    if(index === existingIndex){
                        const newQuantity = item.quantity + 1
                        return {
                            ...item,
                            quantity: newQuantity > item.stock ? item.stock : newQuantity
                        }
                    }

                    return item

                })

            }

            return [...state, {...product, quantity: 1}]
        }

        case "REMOVE_ITEM":{
            return state.filter(item => item.id !== action.payload)
        }

        case "CHANGE_QUANTITY":{
            const {id, quantity} = action.payload

            return state.map(item => {
                if(item.id === id){
                    const validQuantity = Math.max(1, Math.min(quantity, item.stock))
                    return {...item, quantity: validQuantity}
                }

                return item
            })
        }

        case "CLEAR_CART":{
            return []
            
        }
        
        default:
            return state
    }


}

export default cartReducer