import MealItem from "./MealItem"

function MealList({meals, onDelete}) {
  return (
    <div>
        
        <div>
            {meals.length > 0 && (
                meals.map(meal => (
                    <MealItem key={meal.id} meal={meal}  onDelete={onDelete}/>
                ))
            )}
        </div>


    </div>
  )
}

export default MealList