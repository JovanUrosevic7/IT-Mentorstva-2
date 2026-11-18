import { BrowserRouter, Navigate, Route, Router, Routes } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"




function TempDashboard() {

  const { currentUser, logout } = useAuth()

  return (

    <div className="p-8 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">
        Zdravo, {currentUser?.displayName || currentUser?.email}!
      </h1>
      <p className="text-slate-600">Uspešno ste prijavljeni u zdravstveni karton.</p>
      <button
        onClick={logout}
        className="px-4 py-2 bg-rose-600 text-white rounded-xl font-medium cursor-pointer"
      >
        Odjavi se
      </button>
    </div>

  )

}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3500} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TempDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App