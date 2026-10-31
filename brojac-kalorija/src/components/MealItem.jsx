
function MealItem({meal,onDelete}) {
  return (
    <div className="w-full flex items-center gap-[20px]">
        
        <p>{meal.name}</p>
        <p>{meal.calories}</p>
        <p>{meal.mealType}</p>
        <button onClick={() => onDelete(meal.id)} className="bg-red-400 p-[5px] rounded-sm cursor-pointer">Delete</button>
    </div>
  )
}

export default MealItem