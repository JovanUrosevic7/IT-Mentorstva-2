import { useState, useEffect } from 'react';
import MealList from './MealList';

export default function CalorieTracker() {

    const [mealName, setMealName] = useState("")
    const [caloriesByMeal, setCaloriesByMeal] = useState("")
    const [typeOfMeal, setTypeOfMeal] = useState("dorucak")
    const [error, setError] = useState("")
    const [proteins, setProteins] = useState("")
    const [carbohydrates, setCarbohydrates] = useState("")
    const [fats, setFats] = useState("")

    const [dailyGoal, setDailyGoal] = useState(() => {
        const saved = localStorage.getItem("dailyGoal")
        return saved ? JSON.parse(saved) : 2000
    })

    const [meals, setMeals] = useState(() => {
        const saved = localStorage.getItem("meals")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("meals", JSON.stringify(meals))
    }, [meals])
    
    useEffect(() => {
        localStorage.setItem("dailyGoal", JSON.stringify(dailyGoal))
    }, [dailyGoal])

    const handleAddMeal = (e) => {
        e.preventDefault()

        if (!mealName.trim()) {
            setError('Naziv obroka ne sme biti prazan.');
            return;
        }

        const parsedCalories = Number(caloriesByMeal);
        if (isNaN(parsedCalories) || parsedCalories <= 0) {
            setError('Kalorije moraju biti pozitivan broj veći od 0.');
            return;
        }

        setError("")

        const newMeal = {
            id: Date.now(),
            name: mealName.trim(),
            calories: parsedCalories,
            mealType: typeOfMeal,
            proteins: Number(proteins) || 0,
            carbohydrates: Number(carbohydrates) || 0,
            fats: Number(fats) || 0
        }
        
        
        setMeals([newMeal, ...meals])
        setMealName("")
        setCaloriesByMeal("")
        setTypeOfMeal("dorucak")
        setProteins("")
        setCarbohydrates("")
        setFats("")
    }

    const handleDeleteMeal = (id) => {
        setMeals(meals.filter(meal => meal.id !== id))
    }

    const handleNewDay = () => {
        if (window.confirm("Da li ste sigurni da želite da obrišete sve obroke za novi dan?")) {
            setMeals([])
        }
    }

    const totalConsumed = meals.reduce((sum, meal) => sum + parseInt(meal.calories), 0)
    const progressPercentage = dailyGoal > 0 ? Math.min(Math.round((totalConsumed / dailyGoal) * 100), 100) : 0
    const isExceeded = totalConsumed > dailyGoal
    
    const caloriesByType = meals.reduce((acc, meal) => {
        acc[meal.mealType] = (acc[meal.mealType] || 0) + meal.calories
        return acc
    }, {})

    const totalProteins = meals.reduce((sum, meal) => sum + (Number(meal.proteins) || 0), 0)
    const totalCarbohydrates = meals.reduce((sum, meal) => sum + (Number(meal.carbohydrates) || 0), 0)
    const totalFats = meals.reduce((sum, meal) => sum + (Number(meal.fats) || 0), 0)

    // console.log(meals);
    // console.log(meals[0].calories);
    

    return (
        <div className='min-h-screen bg-slate-50 py-10 px-4 flex justify-center items-start'>
            
            <div className='w-full max-w-xl bg-white shadow-xl rounded-2xl border border-slate-100 flex flex-col p-6 gap-6'>

                {/* Naslov i dugme za novi dan */}
                <div className='flex justify-between items-center border-b border-slate-100 pb-4'>
                    <h1 className='text-2xl font-bold text-slate-800 flex items-center gap-2'>
                        🍎 Brojač Kalorija
                    </h1>
                    {meals.length > 0 && (
                        <button 
                            onClick={handleNewDay} 
                            className='text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold px-3 py-1.5 rounded-lg transition'
                        >
                            Novi dan
                        </button>
                    )}
                </div>

                {/* Podešavanje dnevnog cilja */}
                <div className='bg-slate-50 p-4 rounded-xl border border-slate-200/60'>
                    <label className='block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5'>
                        Dnevni cilj kalorija (kcal)
                    </label>
                    <input 
                        type="number" 
                        value={dailyGoal}
                        className='w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        onChange={(e) => setDailyGoal(Number(e.currentTarget.value) || 0)} 
                    />
                </div>

                {/* Kartice sa statistikom */}
                <div className='grid grid-cols-3 gap-3 text-center'>
                    <div className='bg-blue-50/60 border border-blue-100 p-3.5 rounded-xl'>
                        <p className='text-xs text-blue-600 font-medium mb-1'>Uneto</p>
                        <p className='text-lg font-bold text-blue-900'>{totalConsumed}</p>
                    </div>
                    
                    <div className={`p-3.5 rounded-xl border transition-colors ${isExceeded ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-emerald-50/60 border-emerald-100 text-emerald-900'}`}>
                        <p className={`text-xs font-medium mb-1 ${isExceeded ? 'text-rose-600' : 'text-emerald-600'}`}>Preostalo</p>
                        <p className='text-lg font-bold'>{dailyGoal - totalConsumed}</p>
                    </div>
                    
                    <div className='bg-amber-50/60 border border-amber-100 p-3.5 rounded-xl'>
                        <p className='text-xs text-amber-600 font-medium mb-1'>Procenat</p>
                        <p className='text-lg font-bold text-amber-900'>{progressPercentage}%</p>
                    </div>
                </div>

                

                {/* Forma za dodavanje obroka */}
                <form onSubmit={handleAddMeal} className='bg-slate-50 p-4 rounded-xl border border-slate-200/60 flex flex-col gap-3'>
                    <h3 className='text-sm font-bold text-slate-700'>Dodaj novi obrok</h3>
                    
                    <input 
                        type="text" 
                        placeholder='Naziv obroka (npr. Jaja i tost)' 
                        value={mealName}
                        className='w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                        onChange={(e) => setMealName(e.currentTarget.value)}
                    />
                
                    <div className='grid grid-cols-2 gap-3'>
                        <input 
                            type="number" 
                            placeholder='Broj kalorija' 
                            value={caloriesByMeal}
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            onChange={(e) => setCaloriesByMeal(e.currentTarget.value)}
                        />
                    
                        <select 
                            value={typeOfMeal}
                            onChange={(e) => setTypeOfMeal(e.currentTarget.value)} 
                            className='w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize'
                        >
                            <option value="dorucak">Doručak</option>
                            <option value="rucak">Ručak</option>
                            <option value="vecera">Večera</option>
                            <option value="uzina">Užina</option>
                        </select>
                    </div>

                    <div className='grid grid-cols-3 gap-3'>
                        <input 
                            type="number" 
                            placeholder='Proteini (g)' 
                            value={proteins}
                            onChange={(e) => setProteins(e.currentTarget.value)} 
                            className='bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input 
                            type="number" 
                            placeholder='Uglj. hidrati (g)' 
                            value={carbohydrates}
                            onChange={(e) => setCarbohydrates(e.currentTarget.value)} 
                            className='bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <input 
                            type="number" 
                            placeholder='Masti (g)' 
                            value={fats}
                            onChange={(e) => setFats(e.currentTarget.value)} 
                            className='bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    {error && <p className='text-rose-500 text-xs font-medium mt-1'>{error}</p>}

                    <button 
                        type='submit' 
                        className='w-full mt-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition text-sm shadow-sm'
                    >
                        Dodaj obrok
                    </button>
                </form>

                {/* Zbirovi po vrstama obroka */}
                <div className='grid grid-cols-4 gap-2 bg-slate-100/70 p-3 rounded-xl text-center text-xs text-slate-600'>
                    <div>
                        <span className='block text-slate-400'>Doručak</span>
                        <strong className='text-slate-800 text-sm'>{caloriesByType['dorucak'] || 0}</strong>
                    </div>
                    <div>
                        <span className='block text-slate-400'>Ručak</span>
                        <strong className='text-slate-800 text-sm'>{caloriesByType['rucak'] || 0}</strong>
                    </div>
                    <div>
                        <span className='block text-slate-400'>Večera</span>
                        <strong className='text-slate-800 text-sm'>{caloriesByType['vecera'] || 0}</strong>
                    </div>
                    <div>
                        <span className='block text-slate-400'>Užina</span>
                        <strong className='text-slate-800 text-sm'>{caloriesByType['uzina'] || 0}</strong>
                    </div>
                </div>

                {/* Ukupan zbir Makronutrijenata (Doteran dizajn) */}
                <div className='bg-slate-50 border border-slate-200/60 p-4 rounded-xl flex flex-col gap-2'>
                    <p className='text-xs font-semibold text-slate-600 uppercase tracking-wider'>Ukupni makronutrijenti</p>
                    <div className='grid grid-cols-3 text-center'>
                        <div className='bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs'>
                            <span className='block text-[11px] text-slate-400 font-medium'>Proteini</span>
                            <strong className='text-slate-800 text-sm font-bold'>{totalProteins}g</strong>
                        </div>
                        <div className='bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs mx-2'>
                            <span className='block text-[11px] text-slate-400 font-medium'>Uglj. hidrati</span>
                            <strong className='text-slate-800 text-sm font-bold'>{totalCarbohydrates}g</strong>
                        </div>
                        <div className='bg-white p-2.5 rounded-lg border border-slate-100 shadow-2xs'>
                            <span className='block text-[11px] text-slate-400 font-medium'>Masti</span>
                            <strong className='text-slate-800 text-sm font-bold'>{totalFats}g</strong>
                        </div>
                    </div>
                </div>

                {/* Lista obroka */}
                <div className='flex flex-col gap-2'>
                    <h3 className='text-sm font-bold text-slate-700'>Lista unetih obroka</h3>
                    {meals.length > 0 ? (
                        <div className='w-full'>
                            <MealList meals={meals} onDelete={handleDeleteMeal} />
                        </div>
                    ) : (
                        <div className='w-full border border-dashed border-slate-200 py-8 rounded-xl text-center text-slate-400 text-sm'>
                            Nema unetih obroka za danas
                        </div>
                    )}
                </div>

            </div>

        </div>
    )
}

