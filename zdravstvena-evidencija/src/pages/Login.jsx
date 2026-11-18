import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { HeartPulse } from "lucide-react"

function Login() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState("")

    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try {

            setLoading(true)

            await login(email, password)
            toast.success("Dobrodošli nazad!");
            navigate("/");

        } catch (error) {
            console.error(error);
            toast.error("Pogrešan email ili lozinka.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-teal-600 mb-2">
                        <HeartPulse className="w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Prijava u karton</h1>
                    <p className="text-sm text-slate-500">
                        Unesite vaše podatke za pristup zdravstvenim evidencijama
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Email adresa
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ime@primer.com"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Lozinka
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                        {loading ? "Prijavljivanje..." : "Prijavi se"}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-600">
                    Nemate otvoren nalog?{" "}
                    <Link to="/register" className="text-teal-600 font-semibold hover:underline">
                        Registrujte se
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login