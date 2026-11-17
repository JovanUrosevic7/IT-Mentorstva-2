import {useForm} from "react-hook-form"
import { validateCity, validateEmail, validateLinkedIn, validateName, validatePhone } from "../utils/validators"


function StepOne({formData, updateFormData, nextStep}) {

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        defaultValues: formData
    })

    const onSubmit = (data) => {

        updateFormData(data)
        nextStep()

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">1. Lični podaci</h2>

            {/* Ime i prezime */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ime i prezime *
                </label>
                <input
                    type="text"
                    {...register("fullName", { validate: validateName })}
                    placeholder="Petar Petrović"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                />
                {errors.fullName && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1.5">{errors.fullName.message}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email adresa *
                </label>
                <input
                    type="email"
                    {...register("email", { validate: validateEmail })}
                    placeholder="petar@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                />
                {errors.email && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1.5">{errors.email.message}</p>
                )}
            </div>

            {/* Telefon */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Telefon (+381, +387 ili +385) *
                </label>
                <input
                    type="text"
                    {...register("phone", { validate: validatePhone })}
                    placeholder="+381601234567"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                />
                {errors.phone && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1.5">{errors.phone.message}</p>
                )}
            </div>

            {/* Grad */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grad *
                </label>
                <input
                    type="text"
                    {...register("city", { validate: validateCity })}
                    placeholder="Beograd"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                />
                {errors.city && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1.5">{errors.city.message}</p>
                )}
            </div>

            {/* LinkedIn link (opciono) */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    LinkedIn Profil (opciono)
                </label>
                <input
                    type="text"
                    {...register("linkedin", { validate: validateLinkedIn })}
                    placeholder="https://www.linkedin.com/in/korisnik"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                />
                {errors.linkedin && (
                    <p className="text-red-600 dark:text-red-400 text-sm mt-1.5">{errors.linkedin.message}</p>
                )}
            </div>

            {/* Dugme za dalje */}
            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                    Sledeći korak
                </button>
            </div>
        </form>

    )
}

export default StepOne