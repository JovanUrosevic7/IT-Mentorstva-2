import { useFieldArray, useForm } from "react-hook-form";
import { useAppStore } from "../state/store";
import { WORKOUT_TYPES, type WorkoutType } from "../types";



interface WorkoutFormInputs {

    date: string,
    type: WorkoutType,
    duration: number,
    exercises: {
        name: string,
        sets: number,
        reps: number,
        weight: number,
    }[]

}


interface WorkoutFormProps {
    onClose?: () => void
}


function WorkoutForm({ onClose }: WorkoutFormProps) {

    const addWorkout = useAppStore((state) => state.addWorkout)

    const today = new Date().toISOString().split("T")[0]

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset

    } = useForm<WorkoutFormInputs>({
        defaultValues: {
            date: today,
            type: "snaga",
            duration: 45,
            exercises: [{ name: "", sets: 3, reps: 10, weight: 0 }]
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "exercises"
    })

    const onSubmit = (data: WorkoutFormInputs) => {
        addWorkout(data)
        reset()
        if (onClose) onClose()
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dodaj Novi Trening</h3>

            {/* Osnovne informacije o treningu */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Datum */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Datum</label>
                    <input
                        type="date"
                        {...register("date", { required: "Datum je obavezan" })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                    />
                </div>

                {/* Vrsta treninga */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vrsta treninga</label>
                    <select
                        {...register("type")}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                    >
                        {WORKOUT_TYPES.map((t) => (
                            <option key={t.id} value={t.id}>{t.label}</option>
                        ))}
                    </select>
                </div>

                {/* Trajanje u minutima */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trajanje (min)</label>
                    <input
                        type="number"
                        {...register("duration", { required: "Unesite trajanje", min: 1 })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            {/* Lista vežbi */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Vežbe</h4>
                    <button
                        type="button"
                        onClick={() => append({ name: "", sets: 3, reps: 10, weight: 0 })}
                        className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        + Dodaj vežbu
                    </button>
                </div>

                {fields.map((field, index) => (
                    <div key={field.id} className="space-y-2 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                        {/* Red za naziv vežbe i dugme za brisanje */}
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                placeholder="Naziv vežbe (npr. Čučanj)"
                                {...register(`exercises.${index}.name` as const, { required: true })}
                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
                            />

                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500 hover:text-red-700 px-3 py-2 text-xs font-bold cursor-pointer"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Polja za serije, ponavljanja i kilograme sa malim labelama iznad */}
                        <div className="grid grid-cols-3 gap-2 pt-1">
                            <div>
                                <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Serije</label>
                                <input
                                    type="number"
                                    {...register(`exercises.${index}.sets` as const, { valueAsNumber: true, min: 1 })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Ponavljanja</label>
                                <input
                                    type="number"
                                    {...register(`exercises.${index}.reps` as const, { valueAsNumber: true, min: 1 })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 mb-1">Kilaza (kg)</label>
                                <input
                                    type="number"
                                    {...register(`exercises.${index}.weight` as const, { valueAsNumber: true, min: 0 })}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Submit dugme */}
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors text-sm shadow-sm cursor-pointer"
            >
                Sačuvaj trening
            </button>
        </form>
    )
}

export default WorkoutForm
