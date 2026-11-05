
function ProductCard({ product }) {
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
                </div>
            </div>

            {/* Cena i dugme */}
            <div className="p-4 pt-0 flex items-center justify-between">
                <span className="text-xl font-extrabold text-blue-600">
                    ${product.price}
                </span>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    Dodaj u korpu
                </button>
            </div>
        </div>
    )
}

export default ProductCard