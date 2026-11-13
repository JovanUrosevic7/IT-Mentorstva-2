import Login from "./components/Login"
import WorkoutForm from "./components/WorkoutForm"
import WorkoutList from "./components/WorkoutList"
import { useAppStore } from "./state/store"

function MainApp() {

  const currentUser = useAppStore((state) => state.currentUser)
  const setCurrentUser = useAppStore((state) => state.setCurrentUser)


  if (!currentUser) {
    return <Login onLoginSuccess={(user) => setCurrentUser(user)} />
  }

  return (

    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {/* Gornji meni / Header */}
        <header className="flex justify-between items-center bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Dnevnik Treninga 🏋️‍♂️
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Prijavljeni ste kao: <span className="font-semibold text-gray-700 dark:text-gray-300">{currentUser.name}</span>
                </p>
            </div>
            <button
                onClick={() => setCurrentUser(null)}
                className="bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-medium px-4 py-2.5 rounded-xl transition-colors text-sm cursor-pointer"
            >
                Odjavi se
            </button>
        </header>

        {/* Forma za unos novog treninga */}
        <WorkoutForm />

        {/* Lista sačuvanih treninga */}
        <WorkoutList />
    </div>

  )

}

function App() {
  return (
      <MainApp  />
  )
}

export default App