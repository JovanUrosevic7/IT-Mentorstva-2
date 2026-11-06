import { createContext, useContext, useEffect, useReducer } from "react"
import cartReducer, { INITIAL_CART_STATE } from "./cartReducer"

const CartContext = createContext()
const LOCAL_STORAGE_KEY = "shop_cart_items"

export default function CartProvider({children}) {

    const [cart, dispatch] = useReducer(cartReducer, INITIAL_CART_STATE, () => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
        return saved ? JSON.parse(saved) : INITIAL_CART_STATE
    })

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart))
    }, [cart])


    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)

    const addToCart = (product) => dispatch({type:"ADD_ITEM", payload: product})
    const removeFromCart = (id) => dispatch({type:"REMOVE_ITEM", payload:id})
    const changeQuantity = (id, quantity) => dispatch({type:"CHANGE_QUANTITY", payload: {id, quantity}})
    const clearCart = () => dispatch({type: "CLEAR_CART"})


    return (
        <CartContext.Provider value={{
            cart,
            totalItems,
            totalPrice,
            addToCart,
            removeFromCart,
            changeQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);