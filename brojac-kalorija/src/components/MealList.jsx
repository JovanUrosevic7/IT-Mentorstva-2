import MealItem from "./MealItem"

function MealList({meals, onDelete}) {
  return (
    <div className="w-full flex flex-col gap-2.5">
      {meals.map(meal => (
        <MealItem key={meal.id} meal={meal} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default MealList
