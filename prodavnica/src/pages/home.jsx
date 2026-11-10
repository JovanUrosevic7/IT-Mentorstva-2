import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "../components/ProductCard"

function Home() {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all")
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

    useEffect(() => {        
        const fetchPorductsByCategory = async () => {   
            try{
                setLoading(true)
                const response = await axios.get(`https://dummyjson.com/products/categories`)
                const data = response.data
                console.log(data);
                
                

                const formattedCategories = data.map(cat => 
                    typeof cat === "string" ? cat : cat.slug
                )
                setCategories(formattedCategories)
                
            } catch(err) {
                console.error("Greška pri učitavanju proizvoda po kategoriji:", err);
                setLoading(false);
            } finally{
                setLoading(false)
            }
        }

        fetchPorductsByCategory()
    }, [])

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter(product => product.category === selectedCategory)



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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Dobrodošli u DummyShop</h1>
                <p className="text-gray-500">Pronađite najbolje proizvode po super cenama</p>
            </div>

            {/* Filter po kategorijama (Horizontalni skrolabilni meni) */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
                <button
                    onClick={() => setSelectedCategory("all")}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        selectedCategory === "all"
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                    Sve kategorije
                </button>

                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap capitalize transition-colors cursor-pointer ${
                            selectedCategory === category
                                ? "bg-blue-600 text-white shadow-sm"
                                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                        }`}
                    >
                        {category.replace("-", " ")}
                    </button>
                ))}
            </div>

            {/* Prikaz proizvoda ili poruke ako nema rezultata */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
                    <p className="text-gray-500 text-lg">Nema proizvoda u ovoj kategoriji.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product = {product} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home