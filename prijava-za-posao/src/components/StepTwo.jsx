import { useFieldArray, useForm } from "react-hook-form"
import { validateEndDate } from "../utils/validators";

function StepTwo() {

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm ({
        defaultValues:{
            jobs:[
                {company:"", position:"",startDate:"",endDate:""}
            ]
        }
    })

    const {fields, append, remove} = useFieldArray({
        control,
        name: "jobs"
    })

    const onSubmit = (data) => {
        console.log(data);
        alert("StepTwo finished, look at console")
        
    }

    return (
        <div className="max-w-xl mx-auto px-4 py-12">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Prijava za posao - Korak 2</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Unesite vaše radno iskustvo (možete dodati više poslova).</p>

                {/* Petlja kroz poslove */}
                {fields.map((field, index) => {
                    // Pratimo datum početka da bismo mogli da validiramo datum završetka
                    const startDateValue = watch(`jobs.${index}.startDate`);

                    return (
                        <div key={field.id} className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4 relative">
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Posao #{index + 1}</h3>
                                
                                {/* Dugme za brisanje posla (dozvoljavamo brisanje samo ako ima više od 1 posla) */}
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-600 hover:text-red-700 text-xs font-medium cursor-pointer"
                                    >
                                        Ukloni posao ✕
                                    </button>
                                )}
                            </div>

                            {/* Firma */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Firma *</label>
                                <input
                                    type="text"
                                    {...register(`jobs.${index}.company`, { required: "Naziv firme je obavezan." })}
                                    placeholder="Naziv kompanije"
                                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.jobs?.[index]?.company && (
                                    <p className="text-red-600 text-xs mt-1">{errors.jobs[index].company.message}</p>
                                )}
                            </div>

                            {/* Pozicija */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Pozicija *</label>
                                <input
                                    type="text"
                                    {...register(`jobs.${index}.position`, { required: "Pozicija je obavezna." })}
                                    placeholder="Frontend Developer"
                                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                                {errors.jobs?.[index]?.position && (
                                    <p className="text-red-600 text-xs mt-1">{errors.jobs[index].position.message}</p>
                                )}
                            </div>

                            {/* Datumi: Od i Do */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Od datuma *</label>
                                    <input
                                        type="date"
                                        {...register(`jobs.${index}.startDate`, { required: "Datum početka je obavezan." })}
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                    {errors.jobs?.[index]?.startDate && (
                                        <p className="text-red-600 text-xs mt-1">{errors.jobs[index].startDate.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Do datuma (prazno = trenutno)</label>
                                    <input
                                        type="date"
                                        {...register(`jobs.${index}.endDate`, {
                                            validate: (value) => validateEndDate(value, startDateValue)
                                        })}
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                    {errors.jobs?.[index]?.endDate && (
                                        <p className="text-red-600 text-xs mt-1">{errors.jobs[index].endDate.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Dugme za dodavanje novog posla */}
                <button
                    type="button"
                    onClick={() => append({ company: "", position: "", startDate: "", endDate: "" })}
                    className="w-full py-2.5 border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer"
                >
                    + Dodaj još jedan posao
                </button>

                {/* Submit dugme */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-xl transition-colors cursor-pointer"
                >
                    Završi Korak 2
                </button>
            </form>
        </div>
    )
}

export default StepTwo