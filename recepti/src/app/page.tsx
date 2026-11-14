import RecipeCard from "@/components/RecipeCard";
import { getAllRecipes } from "@/services/recipeService";
import Link from "next/link";

export default async function Home() {

  const recipes = await getAllRecipes()

  const featuredRecipes = recipes.slice(0, 9)





  return (
    <div className="space-y-12">
      {/* Hero sekcija */}
      <section className="text-center space-y-4 py-12 bg-gradient-to-b from-orange-50/50 dark:from-orange-950/20 to-transparent rounded-3xl p-8 border border-orange-100/50 dark:border-orange-900/20">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Otkrijte najbolje <span className="text-orange-600 dark:text-orange-500">recepte</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Prelistajte našu pažljivo odabranu kolekciju ukusnih recepata sa detaljnim uputstvima, sastojcima i vremenom pripreme.
        </p>
        <div>
          <Link
            href="/recipes"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            Pogledajte sve recepte →
          </Link>
        </div>
      </section>

      {/* Sekcija sa 9 istaknutih recepata */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Istaknuti recepti</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Najpopularniji izbori za danas</p>
          </div>
          <Link href="/recipes" className="text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-500">
            Vidi sve ({recipes.length}) →
          </Link>
        </div>

        {/* Grid sa 9 kartica */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
