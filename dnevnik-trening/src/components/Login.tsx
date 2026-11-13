import { useForm } from "react-hook-form"
import usersData from "../data/users.json";
import type { User } from "../types"


interface LoginFormInputs {
  username: string,
  password: string
}

interface LoginProps {
  onLoginSuccess: (user: User) => void
}


function Login({ onLoginSuccess }: LoginProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormInputs>()

  const onSubmit = (data: LoginFormInputs) => {

    const foundUser = usersData.find(
      (u) => u.username === data.username && u.password === data.password
    )

    if (foundUser) {
      onLoginSuccess(foundUser)
    } else {
      setError("root", {
        message: "Pogrešno korisničko ime ili lozinka."
      })
    }

  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dnevnik Treninga</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Prijavite se na svoj nalog.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Korisničko ime */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Korisničko ime
          </label>
          <input
            type="text"
            {...register("username", { required: "Korisničko ime je obavezno." })}
            placeholder="npr. marko"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.username && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        {/* Lozinka */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Lozinka
          </label>
          <input
            type="password"
            {...register("password", { required: "Lozinka je obavezna." })}
            placeholder="••••"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.password && (
            <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Greška pri prijavi */}
        {errors.root && (
          <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-xl">
            <p className="text-red-600 dark:text-red-400 text-xs font-medium">{errors.root.message}</p>
          </div>
        )}

        {/* Dugme */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors cursor-pointer text-sm shadow-sm"
        >
          Prijavi se
        </button>
      </form>

      {/* Testni podaci podsetnik */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p className="font-semibold mb-1">Testni nalozi za proveru:</p>
        <p>• Korisničko ime: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">marko</code> | Lozinka: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">123</code></p>
        <p>• Korisničko ime: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">ana</code> | Lozinka: <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">123</code></p>
      </div>
    </div>
  )
}

export default Login