import { useAppStore } from "../state/store"



function WorkoutList() {

    const currentUser = useAppStore((state) => state.currentUser)
    const workouts = useAppStore((state) => state.workouts)
    const deleteWorkout = useAppStore((state) => state.deleteWorkout)

    if(!currentUser) return null

    const userWorkouts = workouts.filter((w) => w.username === currentUser.username)

    if(userWorkouts.length === 0){
        return (
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Još uvek nemate unetih treninga. Iskoristite formu iznad da dodate prvi trening! 💪</p>
            </div>
        );
    }



    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Vaši treninzi ({userWorkouts.length})</h3>

            <div className="space-y-3">
                {userWorkouts.map((workout) => (
                    <div 
                        key={workout.id} 
                        className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                        {/* Osnovne info o treningu */}
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 uppercase">
                                    {workout.type}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">📅 {workout.date}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">⏱️ {workout.duration} min</span>
                            </div>

                            {/* Spisak vežbi u tom treningu */}
                            <div className="text-xs text-gray-700 dark:text-gray-300 pt-2">
                                <span className="font-medium text-gray-900 dark:text-white">Vežbe: </span>
                                {workout.exercises.map((ex, idx) => (
                                    <span key={ex.id || idx} className="inline-block mr-3">
                                        🔹 {ex.name} ({ex.sets} ser. x {ex.reps} pon. {ex.weight > 0 ? `@ ${ex.weight}kg` : ""})
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Dugme za brisanje */}
                        <button
                            onClick={() => deleteWorkout(workout.id)}
                            className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-xl transition-colors font-medium self-end md:self-center cursor-pointer"
                        >
                            Obriši trening
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WorkoutList