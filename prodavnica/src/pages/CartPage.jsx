import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export default function CartPage() {
    const { cart, totalPrice, removeFromCart, changeQuantity, clearCart } = useCart();
    const { formatPrice } = useCurrency();

    // Ako je korpa prazna
    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Vaša korpa je prazna</h2>
                <p className="text-gray-500 mb-6">Izgleda da još uvek niste dodali nijedan proizvod u korpu.</p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
                >
                    Vrati se na kupovinu
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">🛍️ Vaša Korpa</h1>
                <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-800 font-medium underline transition-colors cursor-pointer"
                >
                    Isprazni korpu
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Leva strana: Lista proizvoda u korpi */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map(item => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4"
                        >
                            {/* Slika i osnovne informacije */}
                            <div className="flex items-center space-x-4 w-full sm:w-auto">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                                />
                                <div>
                                    <h3 className="font-bold text-gray-800 text-base">{item.title}</h3>
                                    <p className="text-sm text-blue-600 font-semibold mt-1">
                                        {formatPrice(item.price)}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">Na stanju: {item.stock} kom</p>
                                </div>
                            </div>

                            {/* Kontrole količine i brisanje */}
                            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4">
                                {/* Količina + i - */}
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => {
                                            console.log("Kliknuto minus za ID:", item.id);
                                            changeQuantity(item.id, item.quantity - 1);
                                        }}
                                        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition-colors cursor-pointer"
                                    >
                                        -
                                    </button>

                                    <span className="px-4 py-1 text-gray-800 font-medium text-sm">
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() => {
                                            console.log("Kliknuto plus za ID:", item.id);
                                            changeQuantity(item.id, item.quantity + 1);
                                        }}
                                        disabled={item.quantity >= item.stock}
                                        className={`px-3 py-1 font-bold transition-colors ${item.quantity >= item.stock
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 cursor-pointer'
                                            }`}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Ukupno za ovaj proizvod */}
                                <span className="font-bold text-gray-900 w-24 text-right">
                                    {formatPrice(item.price * item.quantity)}
                                </span>

                                {/* Dugme za brisanje */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-600 p-2 transition-colors cursor-pointer"
                                    title="Ukloni proizvod"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desna strana: Rezime korpe (Total) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                        Pregled porudžbine
                    </h3>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>Međuzbir:</span>
                            <span className="font-medium">{formatPrice(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>Dostava:</span>
                            <span className="font-medium text-green-600">Besplatna</span>
                        </div>
                        <div className="border-t border-gray-100 pt-3 flex justify-between text-gray-900 font-bold text-lg">
                            <span>Ukupno za uplatu:</span>
                            <span className="text-blue-600">{formatPrice(totalPrice)}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => alert('Uspešno završena kupovina!')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm cursor-pointer"
                    >
                        Završi kupovinu
                    </button>
                </div>

            </div>
        </div>
    );
}