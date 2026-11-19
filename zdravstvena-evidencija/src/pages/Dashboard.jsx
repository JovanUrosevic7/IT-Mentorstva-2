import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserRecords } from "../services/recordService";
import { Stethoscope, Syringe, Pill, PlusCircle, Activity, Bell } from "lucide-react";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getUserRecords(currentUser.uid);
        setRecords(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    if (currentUser) load();
  }, [currentUser]);

  const checkupsCount = records.filter((r) => r.category === "pregled").length;
  const vaccinesCount = records.filter((r) => r.category === "vakcina").length;
  const medsCount = records.filter((r) => r.category === "lek").length;
  const activeReminders = records.filter((r) => r.category === "lek" && r.reminderTime);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dobrodošli, {currentUser?.displayName || currentUser?.email}
          </h1>
          <p className="text-sm text-slate-500">
            Vaš lični zdravstveni karton, terapije i praćenje parametara na jednom mestu
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/records/new"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> Novi unos
          </Link>
          <Link
            to="/metrics"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            <Activity className="w-4 h-4" /> Grafikoni
          </Link>
        </div>
      </div>

      {/* Statistike */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-sky-50 text-sky-600">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Lekarski pregledi</p>
            <p className="text-2xl font-bold text-slate-900">{loading ? "..." : checkupsCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <Syringe className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Vakcinacije</p>
            <p className="text-2xl font-bold text-slate-900">{loading ? "..." : vaccinesCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Aktivni lekovi</p>
            <p className="text-2xl font-bold text-slate-900">{loading ? "..." : medsCount}</p>
          </div>
        </div>
      </div>

      {/* Aktivni podsetnici za lekove */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" /> Podsetnici za terapiju
          </h2>
          <Link to="/records" className="text-sm font-semibold text-teal-600 hover:underline">
            Sve evidencije →
          </Link>
        </div>

        {activeReminders.length === 0 ? (
          <p className="text-sm text-slate-500">
            Trenutno nemate podešene podsetnike za lekove. Možete ih dodati u sekciji{" "}
            <Link to="/records/new" className="text-teal-600 font-medium hover:underline">
              Dodaj unos
            </Link>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {activeReminders.map((med) => (
              <div
                key={med.id}
                className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-900">{med.title}</p>
                  {med.dosage && <p className="text-xs text-slate-600">{med.dosage}</p>}
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-white text-amber-800 font-bold text-sm border border-amber-200">
                  {med.reminderTime}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}