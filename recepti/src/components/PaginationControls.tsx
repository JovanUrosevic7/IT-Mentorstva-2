import Link from "next/link";

interface PaginationControlsProps{
    currentPage: number,
    totalPages: number
}


function PaginationControls({currentPage, totalPages}: PaginationControlsProps) {

    const hasPrevPage = currentPage > 1
    const hasNextPage = currentPage < totalPages


    return (
        <div className="flex items-center justify-center gap-2 pt-8 border-t border-gray-100 dark:border-gray-800">
            {/* Dugme Prethodna */}
            {hasPrevPage ? (
                <Link
                    href={`/recipes?page=${currentPage - 1}`}
                    className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-orange-500 hover:text-orange-600 transition-colors"
                >
                    ← Prethodna
                </Link>
            ) : (
                <span className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-100 dark:border-gray-800/50 bg-gray-50 dark:bg-gray-900/50 text-gray-400 cursor-not-allowed">
                    ← Prethodna
                </span>
            )}

            {/* Brojevi stranica */}
            <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = pageNum === currentPage;
                    return (
                        <Link
                            key={pageNum}
                            href={`/recipes?page=${pageNum}`}
                            className={`w-10 h-10 flex items-center justify-center text-sm font-semibold rounded-xl transition-colors ${isActive
                                    ? "bg-orange-600 text-white shadow-sm"
                                    : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-500 hover:text-orange-600"
                                }`}
                        >
                            {pageNum}
                        </Link>
                    );
                })}
            </div>

            {/* Dugme Sledeća */}
            {hasNextPage ? (
                <Link
                    href={`/recipes?page=${currentPage + 1}`}
                    className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-orange-500 hover:text-orange-600 transition-colors"
                >
                    Sledeća →
                </Link>
            ) : (
                <span className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-100 dark:border-gray-800/50 bg-gray-50 dark:bg-gray-900/50 text-gray-400 cursor-not-allowed">
                    Sledeća →
                </span>
            )}
        </div>
    )
}

export default PaginationControls