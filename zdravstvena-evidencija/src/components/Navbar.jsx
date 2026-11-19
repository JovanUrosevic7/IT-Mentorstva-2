import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify"
import { FileText, HeartPulse, LayoutDashboard, LogOut, PlusCircle } from "lucide-react"
import { Activity } from "react"



function Navbar() {

    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            await logout()
            toast.info("Uspešno ste se odjavili.")
            navigate("/login")
        } catch (error) {
            console.error(error);
            toast.error("Greška prilikom odjave.");
        }
    }

    const navLinkClass = ({ isActive }) =>
        `inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${isActive
            ? "bg-teal-50 text-teal-700 font-semibold"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`;

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 text-teal-600 font-bold text-lg">
                    <div className="p-2 bg-teal-50 rounded-xl">
                        <HeartPulse className="w-6 h-6" />
                    </div>
                    <span className="hidden sm:inline text-slate-900">MojKarton</span>
                </Link>

                {/* Glavni linkovi */}
                <nav className="flex items-center gap-1 sm:gap-2">
                    <NavLink to="/" end className={navLinkClass}>
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="hidden md:inline">Pregled</span>
                    </NavLink>
                    <NavLink to="/records" end className={navLinkClass}>
                        <FileText className="w-4 h-4" />
                        <span>Evidencije</span>
                    </NavLink>
                    <NavLink to="/records/new" className={navLinkClass}>
                        <PlusCircle className="w-4 h-4" />
                        <span>Dodaj unos</span>
                    </NavLink>
                    <NavLink to="/metrics" className={navLinkClass}>
                        <Activity className="w-4 h-4" />
                        <span>Grafikoni</span>
                    </NavLink>
                </nav>

                {/* Korisnik i odjava */}
                <div className="flex items-center gap-3">
                    <span className="hidden lg:inline text-sm text-slate-500">
                        {currentUser?.displayName || currentUser?.email}
                    </span>
                    <button
                        onClick={handleLogout}
                        title="Odjavi se"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Odjava</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar