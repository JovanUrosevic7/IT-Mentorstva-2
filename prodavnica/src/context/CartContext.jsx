import { createContext, useContext, useEffect, useReducer } from "react"
import cartReducer, { INITIAL_CART_STATE } from "./cartReducer"

const CartContext = createContext()
const LOCAL_STORAGE_KEY = "shop_cart_items"

export default function CartProvider({children}) {

    const [cartState, dispatch] = useReducer(cartReducer, INITIAL_CART_STATE, () => {

        const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
        if(!saved) return INITIAL_CART_STATE
    
        try{
            const parsed = JSON.parse(saved)
            if(Array.isArray(parsed)){
                return {items: parsed, coupon:null}
            }

            return parsed
        } catch{
            return INITIAL_CART_STATE
        }
    
    })

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartState))
    }, [cartState])

    
    const items = cartState.items
    const coupon = cartState.coupon

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

    const discountAmount = coupon ? (subtotalPrice * coupon.discountPercent) / 100 : 0
    const discountedPrice = Math.max(0, subtotalPrice - discountAmount)

    const FREE_SHIPPING_THRESHOLD = 50
    const isFreeShipping = discountedPrice >= FREE_SHIPPING_THRESHOLD
    const SHIPPING_COST = isFreeShipping ? 0 : 5

    const totalPrice = discountedPrice - SHIPPING_COST

    const amountNeededForFreeShipping = isFreeShipping ? 0 : FREE_SHIPPING_THRESHOLD - discountedPrice

    const addToCart = (product) => dispatch({type:"ADD_ITEM", payload: product})
    const removeFromCart = (id) => dispatch({type:"REMOVE_ITEM", payload:id})
    const changeQuantity = (id, quantity) => dispatch({type:"CHANGE_QUANTITY", payload: {id, quantity}})
    const clearCart = () => dispatch({type: "CLEAR_CART"})

    const applyCoupon = (code) => {

        const cleanCode = code.trim().toUpperCase()

        const validCoupon = {
            "POPUST10": {code: "POPUST10", discountPercent: 10},
            "SUPER20": {code:"SUPER20", discountPercent: 20},
            "AKCIJA50": {code:"AKCIJA50", discountPercent: 50},
        }

        if(validCoupon[cleanCode]){
            dispatch({type: "APPLY_COUPON", payload: validCoupon[cleanCode]})
            return {success: true, message: `Kupon ${cleanCode} je uspešno primenjen!`}
        } else{
            return {success: false, message: `Nepoznat ili nevažeći kupon kod!`}
            
        }

    }

    const removeCoupon = () => dispatch({type: "REMOVE_COUPON"})

    return (
        <CartContext.Provider value={{
            cart: items,
            coupon,
            totalItems,
            subtotalPrice,
            discountAmount,
            isFreeShipping,
            SHIPPING_COST,
            amountNeededForFreeShipping,
            totalPrice,
            addToCart,
            removeFromCart,
            changeQuantity,
            clearCart,
            applyCoupon,
            removeCoupon
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);