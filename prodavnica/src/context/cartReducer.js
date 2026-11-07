export const INITIAL_CART_STATE = {
    items: [],
    coupon: null

}


function cartReducer(state, action) {

    switch(action.type){
        case "INIT_CART":{
            return action.payload
        }

        case "ADD_ITEM":{
            const product = action.payload
            const existingIndex = state.findIndex(item => item.id === product.id)

            if(existingIndex > -1){

                const updatedItems = state.map((item, index) => {

                    if(index === existingIndex){
                        const newQuantity = item.quantity + 1
                        return {
                            ...item,
                            quantity: newQuantity > item.stock ? item.stock : newQuantity
                        }
                    }

                    return item

                })
    
                return {...state, item: updatedItems}

            }

            return {...state, items:[...state.items, {...product, quantity: 1}]}
        }

        case "REMOVE_ITEM":{
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
                
            }
        }


        case "CHANGE_QUANTITY":{
            const {id, quantity} = action.payload

            const updatedItems = state.items.map(item => {
                if(item.id === id){
                    const validQuantity = Math.max(1, Math.min(quantity, item.stock))
                    return {...item, quantity: validQuantity}
                }

                return item
            })

            return {...state, items: updatedItems}
        }

        case "CLEAR_CART":{
            return {...state, item:[], coupon: action.payload}
        }

        case "APPLY_COUPON":{
            return {...state, coupon: action.payload}
        }

        case "REMOVE_COUPON":{
            return {...state, coupon: null}
        }
        
        default:
            return state
    }


}

export default cartReducer