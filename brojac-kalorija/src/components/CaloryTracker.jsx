import { useState, useEffect } from 'react';
import MealList from './MealList';

export default function CalorieTracker() {

    const [totalCalories, setTotalCalories] = useState(2000)
    const [mealName, setMealName] = useState("")
    const [caloriesByMeal, setCaloriesByMeal] = useState(0)
    const [typeOfMeal, setTypeOfMeal] = useState("dorucak")
    const [error, setError] = useState("")

    const [meals, setMeals] = useState(() => {
        const saved = localStorage.getItem("meals")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("meals", JSON.stringify(meals))
    }, [meals])

    const handleAddMeal = (e) => {

        e.preventDefault()

        if (!mealName.trim()) {
            setError('Naziv obroka ne sme biti prazan.');
            return;
        }

        if (caloriesByMeal <= 0) {
            setError('Kalorije moraju biti pozitivan broj veći od 0.');
            return;
        }

        const newMeal = {
            id: Date.now(),
            name: mealName.trim(),
            calories: caloriesByMeal,
            mealType: typeOfMeal
        }

        console.log(totalCalories, mealName, caloriesByMeal, typeOfMeal);
        
        setMeals([newMeal, ...meals ])
        setMealName("")
        setCaloriesByMeal("")
        setTypeOfMeal("dorucak")

    }

    const handleDeleteMeal = (id) => {
        setMeals(meals.filter(meal => meal.id !== id))
    }

    return (
        <div className='w-full flex justify-center items-center my-[20px]'>
            
            <div className='border w-[40%] flex flex-col items-center justify-center gap-[10px] p-[10px]'>

                <h1 className='text-4xl'>Brojac kalorija</h1>

                <div className='w-full'>

                    <input type="number" placeholder='2000' className='border' onChange={(e) => setTotalCalories(e.currentTarget.value)} />
                    
                    <form action="" onSubmit={handleAddMeal} className='flex justify-between'>
                        <input type="text" placeholder='Naziv obroka' onChange={(e) => setMealName(e.currentTarget.value)}/>
                    
                        <input type="number" placeholder='Broj kalorija' onChange={(e) => setCaloriesByMeal(e.currentTarget.value)}/>
                    
                        <select name="" id="" onChange={(e) => setTypeOfMeal(e.currentTarget.value)}>
                            <option value="dorucak">dorucak</option>
                            <option value="rucak">rucak</option>
                            <option value="vecera">vecera</option>
                            <option value="uzina">uzina</option>
                        </select>
                    
                        <button type='submit' className='cursor-pointer'>Dodaj obrok</button>
                    
                    </form>

                    {error && <p style={{ color: 'red', margin: '0', fontSize: '13px' }}>{error}</p>}

                </div>

                <MealList meals={meals} onDelete={handleDeleteMeal} />

            </div>

        </div>
    )
}