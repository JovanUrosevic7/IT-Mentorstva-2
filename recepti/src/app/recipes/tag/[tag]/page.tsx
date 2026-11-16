import RecipeCard from "@/components/RecipeCard";
import { getRecipeByTag } from "@/services/recipeService";
import Link from "next/link";

interface TagPageProp {
    params: Promise<{ tag: string }>
}

export default async function TagPage({ params }: TagPageProp) {

    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    const recipes = await getRecipeByTag(decodedTag);

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

            {/* Zaglavlje */}
            <div className="space-y-2">
                <div className="flex items-center gap-[10px]">
                    <span className="bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 font-medium px-3 py-1 rounded-full text-xl">
                        Tag
                    </span>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight capitalize">
                        #{decodedTag}
                    </h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    Pronađeno {recipes.length} recepata sa ovim tagom.
                </p>
            </div>

            {/* Grid recepata */}
            {recipes.length === 0 ? (
                <div className="text-center py-12 text-gray-500">Nema recepata za ovaj tag.</div>
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

