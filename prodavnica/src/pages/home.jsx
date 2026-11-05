import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "../components/ProductCard"

function Home() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const API_URL = 'https://dummyjson.com/products'

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                setLoading(true)

                const response = await axios.get(`${API_URL}`)
                setProducts(response.data.products)

            } catch (err) {
                setError('Nije moguće učitati proizvode. Proverite internet konekciju.');
                console.error(err);
            } finally {
                setLoading(false);
            }

        }

        fetchProducts()
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500 font-medium">Učitavanje proizvoda...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto mt-10 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
                {error}
            </div>
        );
    }



    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8">🛍️ Naši Proizvodi</h1>

                {/* Grid sa proizvodima */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>


        </div>
    )
}

export default Home