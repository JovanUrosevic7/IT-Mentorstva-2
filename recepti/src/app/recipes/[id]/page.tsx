import IngredientsList from "@/components/IngredientsList";
import { getRecipeById } from "@/services/recipeService";
import Image from "next/image";
import Link from "next/link";



interface RecipePageProps {
    params: Promise<{ id: number }>
}

export default async function RecipeDetailPage({ params }: RecipePageProps) {

    const { id } = await params
    const recipe = await getRecipeById(Number(id))

    console.log(typeof (id));
    console.log(recipe);


    // Ako recept ne postoji (nepostojeći ID), prikazujemo poruku
    if (!recipe) {
        return (
            <div className="text-center py-20 space-y-6">
                <div className="text-6xl">🍳❓</div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Recept nije pronađen</h1>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                    Izgleda da recept koji tražite ne postoji ili je uklonjen sa servera.
                </p>
                <div>
                    <Link
                        href="/recipes"
                        className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-sm"
                    >
                        ← Nazad na sve recepte
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Navigacioni link nazad */}
            <div>
                <Link
                    href="/recipes"
                    className="text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-500 inline-flex items-center gap-1"
                >
                    ← Nazad na sve recepte
                </Link>
            </div>

            {/* Zaglavlje recepta */}
            <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 font-medium px-3 py-1 rounded-full text-xs">
                        <Link href={`/recipes/cuisine/${recipe.cuisine}`} className="bg-orange-50 ... hover:underline">
                            {recipe.cuisine}
                        </Link>
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium px-3 py-1 rounded-full text-xs capitalize">
                        Težina: {recipe.difficulty}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                        ⭐ {recipe.rating} ({recipe.reviewCount} recenzija)
                    </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {recipe.name}
                </h1>

                {/* Tagovi */}
                <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-md">
                            <Link href={`/recipes/tag/${tag}`} className="text-xs bg-gray-100 ... hover:bg-gray-200">
                                #{tag}
                            </Link>
                        </span>
                    ))}
                </div>
            </div>

            {/* Glavna slika i brze informacije */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Slika recepta */}
                <div className="md:col-span-2 relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800">
                    <Image
                        src={recipe.image}
                        alt={recipe.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 66vw"
                    />
                </div>

                {/* Kartica sa specifikacijama */}
                <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm flex flex-col  space-y-4">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-3">
                        Informacije o obroku
                    </h3>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Vreme pripreme:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{recipe.prepTimeMinutes} min</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Vreme kuvanja:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{recipe.cookTimeMinutes} min</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Ukupno vreme:</span>
                            <span className="font-medium text-orange-600 dark:text-orange-500 font-bold">{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Porcije:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{recipe.servings} osobe</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 dark:text-gray-400">Kalorije po porciji:</span>
                            <span className="font-medium text-gray-900 dark:text-white">{recipe.caloriesPerServing} kcal</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sastojci i Uputstva */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                {/* Sastojci (Client Komponenta sa sakrivanjem/štikliranjem) */}
                <div className="lg:col-span-1">
                    <IngredientsList ingredients={recipe.ingredients} />
                </div>

                {/* Uputstvo za pripremu */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Uputstvo za pripremu</h2>
                    <ol className="space-y-4">
                        {recipe.instructions.map((step, index) => (
                            <li key={index} className="flex gap-4 text-sm text-gray-700 dark:text-gray-300">
                                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center text-xs">
                                    {index + 1}
                                </span>
                                <p className="pt-1 leading-relaxed">{step}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

