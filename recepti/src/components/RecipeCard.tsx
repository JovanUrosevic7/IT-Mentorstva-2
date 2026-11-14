import { Recipe } from "@/types/recipe"
import Image from "next/image"
import Link from "next/link"

interface RecipeCardProps{
    recipe: Recipe
}

function RecipeCard({recipe}: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      {/* Next.js Image komponenta */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image 
          src={recipe.image} 
          alt={recipe.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Sadržaj kartice */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
            <span className="bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 font-medium px-2.5 py-0.5 rounded-full">
              {recipe.cuisine}
            </span>
            <span>⭐ {recipe.rating} ({recipe.reviewCount})</span>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-orange-600 transition-colors line-clamp-1">
            {recipe.name}
          </h3>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800">
          <span>⏱️ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          <span className="capitalize font-medium text-gray-700 dark:text-gray-300">
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard