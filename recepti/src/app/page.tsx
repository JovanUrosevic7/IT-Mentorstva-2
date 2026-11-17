import RecipeCard from "@/components/RecipeCard";
import { getAllRecipes } from "@/services/recipeService";
import Link from "next/link";

export default async function Home() {

  const recipes = await getAllRecipes()

  const featuredRecipes = recipes.slice(0, 9)





  return (
    <div className="space-y-12">
      {/* Hero sekcija */}
      <section className="space-y-6 py-10 bg-gradient-to-b from-orange-50/50 dark:from-orange-950/20 to-transparent rounded-3xl p-6 sm:p-8 border border-orange-100/50 dark:border-orange-900/20">
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Šta vam se danas <span className="text-orange-600 dark:text-orange-500">sprema?</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Izaberite tip obroka ili prelistajte celu kolekciju recepata.
          </p>
        </div>

        {/* Navigacija po tipovima obroka */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">

          {/* Kartica za sve recepte */}
          <Link
            href="/recipes"
            className="group flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white shadow-sm hover:shadow-md transition-all"
          >
            <span className="text-3xl mb-2 group-hover:translate-x-1 transition-transform">
              📖
            </span>
            <span className="font-bold">Svi recepti</span>
            <span className="text-xs text-orange-100 mt-0.5">
              Cela kolekcija →
            </span>
          </Link>
          
          {[
            { slug: "breakfast", label: "Doručak", icon: "🍳", desc: "Za dobar početak" },
            { slug: "lunch", label: "Ručak", icon: "🍲", desc: "Glavni obrok" },
            { slug: "dinner", label: "Večera", icon: "🍽️", desc: "Lagani predlozi" },
            { slug: "snack", label: "Užina", icon: "🥪", desc: "Brzi zalogaji" },
            { slug: "dessert", label: "Dezert", icon: "🍰", desc: "Slatki kutak" },
          ].map((meal) => (
            <Link
              key={meal.slug}
              href={`/recipes/meal-type/${meal.slug}`}
              className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {meal.icon}
              </span>
              <span className="font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {meal.label}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {meal.desc}
              </span>
            </Link>
          ))}

          
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
