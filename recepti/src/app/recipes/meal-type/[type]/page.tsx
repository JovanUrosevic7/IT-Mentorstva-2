import RecipeCard from "@/components/RecipeCard";
import { getRecipesByMealType } from "@/services/recipeService";
import Link from "next/link";


interface MealTypePageProps {
    params: Promise<{ type: string }>
}

const mealTypeLabels: Record<string, string> = {
    breakfast: "Doručak",
    lunch: "Ručak",
    dinner: "Večera",
    snack: "Užina",
    dessert: "Dezert",
    "side-dish": "Prilog",
    appetizer: "Predjelo",
    beverage: "Piće",
}

export default async function MealTypePage({ params }: MealTypePageProps) {

    const { type } = await params
    const decodedType = decodeURIComponent(type).toLowerCase();

    const apiType = decodedType.replace("-", " ")
    const recipes = await getRecipesByMealType(apiType)

    const displayTitle = mealTypeLabels[decodedType] || decodedType


    return (
        <div className="space-y-8">
            {/* Navigacija nazad */}
            <div>
                <Link
                    href="/recipes"
                    className="text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-500 inline-flex items-center gap-1"
                >
                    ← Nazad na sve recepte
                </Link>
            </div>

            {/* Zaglavlje stranice */}
            <div className="space-y-2">
                <span className="bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 font-medium px-3 py-1 rounded-full text-xs">
                    Tip obroka
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight capitalize">
                    {displayTitle}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Pronađeno {recipes.length} recepata u ovoj kategoriji.
                </p>
            </div>

            {/* Brzi filter za prebacivanje između glavnih obroka */}
            <div className="flex flex-wrap gap-2">
                {[
                    { slug: "breakfast", label: "🍳 Doručak" },
                    { slug: "lunch", label: "🍲 Ručak" },
                    { slug: "dinner", label: "🍽️ Večera" },
                    { slug: "snack", label: "🥪 Užina" },
                    { slug: "dessert", label: "🍰 Dezert" },
                ].map((meal) => {
                    const isActive = decodedType === meal.slug;
                    return (
                        <Link
                            key={meal.slug}
                            href={`/recipes/meal-type/${meal.slug}`}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isActive
                                    ? "bg-orange-600 text-white shadow-sm"
                                    : "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-500 hover:text-orange-600"
                                }`}
                        >
                            {meal.label}
                        </Link>
                    );
                })}
            </div>

            {/* Grid recepata */}
            {recipes.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                    Nema pronađenih recepata za ovaj tip obroka.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    )
}

