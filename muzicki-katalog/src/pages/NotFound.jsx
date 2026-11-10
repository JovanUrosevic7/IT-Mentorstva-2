import { Link } from "react-router-dom"

function NotFound() {


  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xs text-center flex flex-col items-center gap-5">

        {/* Vizuelni 404 bedž / ikonica */}
        <div className="w-16 h-16 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-3xl shadow-2xs">
          🧭
        </div>

        {/* Tekst obaveštenja */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-slate-800">
            404 - Stranica nije pronađena
          </h1>
          <p className="text-sm text-slate-500">
            Tražena adresa ne postoji ili je premeštena.
          </p>
        </div>

        {/* Dugme za povratak */}
        <Link
          to="/"
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 px-4 rounded-xl transition-all shadow-xs cursor-pointer"
        >
          Idi na početnu stranicu
        </Link>

      </div>
    </div>
  )
}

export default NotFound