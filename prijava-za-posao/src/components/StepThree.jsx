import { useForm } from "react-hook-form"
import { validateCoverLetter, validateSalary, validateSkills } from "../utils/validators"

function StepThree({formData, updateFormData, nextStep, prevStep}) {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            skills: [],
            experienceYears: "",
            expectedSalary: "",
            coverLetter: "",
            ...formData
        }
    })

    const coverLetterValue = watch("coverLetter", "")
    const wordCount = coverLetterValue.trim() ? coverLetterValue.trim().split(/\s+/).length : 0
    const availableSkills = [
        "React.js", "JavaScript", "TypeScript", "Tailwind CSS",
        "Node.js", "Git", "HTML/CSS", "REST APIs"
    ]

    const onSubmit = (data) => {
        updateFormData(data)
        nextStep()
    }

    return (
        <div className="max-w-xl mx-auto px-4 py-12">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Prijava za posao - Korak 3</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Izaberite veštine i unesite dodatne detalje o očekivanjima.</p>

                {/* 1. Izbor veština (Checkbox, bar 3) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Veštine (izaberite najmanje 3) *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {availableSkills.map((skill) => (
                            <label key={skill} className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
                                <input
                                    type="checkbox"
                                    value={skill}
                                    {...register("skills", { validate: validateSkills })}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
                            </label>
                        ))}
                    </div>
                    {errors.skills && (
                        <p className="text-red-600 dark:text-red-400 text-sm mt-2">{errors.skills.message}</p>
                    )}
                </div>

                {/* 2. Godine iskustva i Očekivana plata (u dva stupca) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Godine iskustva *
                        </label>
                        <input
                            type="number"
                            min="0"
                            {...register("experienceYears", { required: "Unesite godine iskustva." })}
                            placeholder="npr. 3"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        />
                        {errors.experienceYears && (
                            <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.experienceYears.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Očekivana plata (EUR) *
                        </label>
                        <input
                            type="number"
                            min="0"
                            {...register("expectedSalary", { validate: validateSalary })}
                            placeholder="npr. 1200"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                        />
                        {errors.expectedSalary && (
                            <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.expectedSalary.message}</p>
                        )}
                    </div>
                </div>

                {/* 3. Propratno pismo (najmanje 50 reči) */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Propratno pismo *
                        </label>
                        {/* Brojač reči u realnom vremenu zahvaljujući watch-u */}
                        <span className={`text-xs font-semibold ${wordCount < 50 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                            Broj reči: {wordCount} / 50 min
                        </span>
                    </div>
                    <textarea
                        rows="5"
                        {...register("coverLetter", { validate: validateCoverLetter })}
                        placeholder="Napišite zašto ste vi pravi izbor za ovu poziciju (minimum 50 reči)..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm resize-none"
                    ></textarea>
                    {errors.coverLetter && (
                        <p className="text-red-600 dark:text-red-400 text-sm mt-1">{errors.coverLetter.message}</p>
                    )}
                </div>

                {/* Submit dugme */}
                {/* <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                    Završi Korak 3
                </button> */}

                <div className="flex justify-between pt-4">
                    <button type="button" onClick={prevStep} className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">Nazad</button>
                    <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium">Sledeći korak</button>
                </div>
            </form>
        </div>
    )
}

export default StepThree