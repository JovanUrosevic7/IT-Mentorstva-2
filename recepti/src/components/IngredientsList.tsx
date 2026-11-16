"use client"

import { useState } from "react"

interface IngredientsListProp{
    ingredients: string[]
}

function IngredientsList({ingredients}: IngredientsListProp) {

    const [isVisible, setIsVisible] = useState(true)
    const [checkedItems, setIsCheckedItems] = useState<Record<number, boolean>>({})

    const toggleCheck = (index: number) => {

        setIsCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index]
        }))

    }


    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sastojci</h2>
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
                >
                    {isVisible ? "Sakrij sastojke 👁️‍🗨️" : "Prikaži sastojke 👁️"}
                </button>
            </div>

            {isVisible && (
                <ul className="space-y-2.5 pt-2 border-t border-gray-100 dark:border-gray-800">
                    {ingredients.map((ingredient, index) => (
                        <li
                            key={index}
                            onClick={() => toggleCheck(index)}
                            className={`flex items-center gap-3 text-sm cursor-pointer p-2 rounded-lg transition-colors ${checkedItems[index]
                                    ? "bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 line-through"
                                    : "hover:bg-orange-50/50 dark:hover:bg-orange-950/20 text-gray-700 dark:text-gray-300"
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={!!checkedItems[index]}
                                onChange={() => { }} // Rukuje se preko li onClika
                                className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4 cursor-pointer"
                            />
                            <span>{ingredient}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default IngredientsList