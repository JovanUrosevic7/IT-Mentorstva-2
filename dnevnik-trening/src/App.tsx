import { RecoilRoot, useRecoilState } from "recoil"
import { currentUserAtom } from "./state/atoms"
import Login from "./components/Login"

function MainApp() {

  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom)

  if (!currentUser) {
    return <Login onLoginSuccess={(user) => setCurrentUser(user)} />
  }

  return (

    <div className="max-w-xl mx-auto mt-20 p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Dobrodošli, {currentUser.name}! 🎉
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Uspešno ste prijavljeni preko Recoil atoma. Vaša sesija je sačuvana u localStorage-u.
      </p>
      <button
        onClick={() => setCurrentUser(null)} // Odjava briše korisnika iz atoma i localStorage-a
        className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors text-sm cursor-pointer shadow-sm"
      >
        Odjavi se
      </button>
    </div>

  )

}

function App() {
  return (
    <RecoilRoot>
      <MainApp  />
    </RecoilRoot>
  )
}

export default App