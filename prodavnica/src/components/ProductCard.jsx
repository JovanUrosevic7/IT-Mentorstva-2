import { useCart } from "../context/CartContext"
import { useCurrency } from "../context/CurrencyContext"

function ProductCard({ product }) {

    const {cart, addToCart} = useCart()
    const {formatPrice} = useCurrency()

    const itemInCart = cart.find(item => item.id === product.id)
    const cartQuantity = itemInCart ? itemInCart.cartQuantity : 0

    const isOutOfStock = cartQuantity >= product.stock

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div>
                {/* Slika proizvoda */}
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-gray-900/75 text-white text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {product.category}
                    </span>
                </div>

                {/* Sadržaj kartice */}
                <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-lg truncate mb-1" title={product.title}>
                        {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 h-10 mb-4">
                        {product.description}
                    </p>
                    {/* Prikaz stanja na lageru */}
                    <p className="text-xs text-gray-400">
                        Zalihe: <span className="font-medium text-gray-600">{product.stock} kom</span>
                        {cartQuantity > 0 && <span className="text-blue-600 ml-2">(U korpi: {cartQuantity})</span>}
                    </p>
                </div>
            </div>

            {/* Cena i dugme */}
            <div className="p-4 pt-0 flex items-center justify-between">
                <span className="text-xl font-extrabold text-blue-600">
                    {formatPrice(product.price)}
                </span>
                <button 
                    onClick={() => addToCart(product)}
                    disabled={isOutOfStock}
                    className={`font-medium text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                        isOutOfStock 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                    {isOutOfStock ? 'Nema na stanju' : 'Dodaj u korpu'}
                </button>
            </div>
        </div>
    )
}

export default ProductCard