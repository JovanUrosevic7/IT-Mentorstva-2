import PaginationControls from "@/components/PaginationControls"
import RecipeCard from "@/components/RecipeCard"
import { getPaginatedRecipes } from "@/services/recipeService"


interface RecipesPageProps {
    searchParams: Promise<{ page?: string }>
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {

    const { page } = await searchParams

    const currentPage = Math.max(1, Number(page) || 1)
    const limit = 9

    const { recipes, total } = await getPaginatedRecipes(currentPage, limit)
    const totalPages = Math.ceil(total / limit)


    return (
        <div className="space-y-8">
            {/* Zaglavlje stranice */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Svi recepti
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Prikazano {recipes.length} od ukupno {total} recepata (Stranica {currentPage} od {totalPages})
                    </p>
                </div>
            </div>

            {/* Grid recepata */}
            {recipes.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                    Nema pronađenih recepata za ovu stranicu.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}

            {/* Komponenta za navigaciju po stranicama */}
            {totalPages > 1 && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    )
}

