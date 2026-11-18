import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import {HeartPulse} from "lucide-react"



function Register() {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState("")

    const { signup } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== confirmPassword) {
            return toast.error("Lozinke se ne podudaraju!");
        }

        if (password.length < 6) {
            return toast.error("Lozinka mora imati najmanje 6 karaktera.");
        }

        try {
            setLoading(true)
            await signup(email, password, fullName)
            toast.success("Uspešno ste kreirali nalog!")
            navigate("/")
        } catch (error) {
            console.error(error);
            if (error.code === "auth/email-already-in-use") {
                toast.error("Ovaj email je već registrovan.");
            } else {
                toast.error("Greška prilikom registracije. Pokušajte ponovo.");
            }
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
                    <h1 className="text-2xl font-bold text-slate-900">Kreirajte nalog</h1>
                    <p className="text-sm text-slate-500">
                        Započnite sigurno vođenje vaših zdravstvenih evidencija
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Ime i prezime
                        </label>
                        <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Petar Petrović"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

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
                            placeholder="Minimum 6 karaktera"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Potvrdite lozinku
                        </label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Ponovite lozinku"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                        {loading ? "Kreiranje naloga..." : "Registruj se"}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-600">
                    Već imate nalog?{" "}
                    <Link to="/login" className="text-teal-600 font-semibold hover:underline">
                        Prijavite se
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register