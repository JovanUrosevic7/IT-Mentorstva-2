import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { deleteHealthRecord, getUserRecords } from "../services/recordService";
import { toast } from "react-toastify";
import { Calendar, Clock, Pill, Plus, Search, Stethoscope, Syringe, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";




function Records() {

    const { currentUser } = useAuth();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all"); // "all" | "pregled" | "vakcina" | "lek"
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function loadRecords() {
            try {
                const data = await getUserRecords(currentUser.uid);
                setRecords(data);
            } catch (error) {
                console.error(error);
                toast.error("Greška pri učitavanju evidencija.");
            } finally {
                setLoading(false);
            }
        }

        if (currentUser) loadRecords();
    }, [currentUser]);

    async function handleDelete(id) {
        if (!window.confirm("Da li ste sigurni da želite da obrišete ovu evidenciju?")) return;

        try {
            await deleteHealthRecord(id);
            setRecords((prev) => prev.filter((item) => item.id !== id));
            toast.success("Evidencija je obrisana.");
        } catch (error) {
            console.error(error);
            toast.error("Greška pri brisanju.");
        }
    }

    const filteredRecords = records.filter((rec) => {
        const matchesCategory = activeFilter === "all" || rec.category === activeFilter;
        const matchesSearch =
            rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (rec.notes && rec.notes.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const categoryConfig = {
        pregled: {
            label: "Pregled",
            icon: Stethoscope,
            badge: "bg-sky-50 text-sky-700 border-sky-200",
        },
        vakcina: {
            label: "Vakcina",
            icon: Syringe,
            badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        lek: {
            label: "Lek",
            icon: Pill,
            badge: "bg-amber-50 text-amber-700 border-amber-200",
        },
    };


    return (
        <div className="space-y-6">
            {/* Zaglavlje */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Zdravstvene evidencije</h1>
                    <p className="text-sm text-slate-500">
                        Pregled svih vaših lekarskih pregleda, vakcinacija i terapija
                    </p>
                </div>
                <Link
                    to="/records/new"
                    className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors"
                >
                    <Plus className="w-5 h-5" /> Dodaj evidenciju
                </Link>
            </div>

            {/* Filteri i pretraga */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
                <div className="flex flex-wrap gap-2">
                    {[
                        { id: "all", label: "Sve" },
                        { id: "pregled", label: "Pregledi" },
                        { id: "vakcina", label: "Vakcine" },
                        { id: "lek", label: "Lekovi" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveFilter(tab.id)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeFilter === tab.id
                                ? "bg-teal-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Pretraži po nazivu ili napomeni..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
            </div>

            {/* Lista evidencija */}
            {loading ? (
                <div className="text-center py-12 text-slate-500">Učitavanje kartona...</div>
            ) : filteredRecords.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
                    <p className="text-slate-500">Nema pronađenih evidencija za izabrani filter.</p>
                    <Link
                        to="/records/new"
                        className="inline-block text-teal-600 font-semibold hover:underline"
                    >
                        + Unesite prvu evidenciju
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredRecords.map((record) => {
                        const config = categoryConfig[record.category] || categoryConfig.pregled;
                        const Icon = config.icon;

                        return (
                            <div
                                key={record.id}
                                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between gap-4 hover:shadow-sm transition-shadow"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.badge}`}
                                        >
                                            <Icon className="w-3.5 h-3.5" />
                                            {config.label}
                                        </span>

                                        <button
                                            onClick={() => handleDelete(record.id)}
                                            title="Obriši"
                                            className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">{record.title}</h3>
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>Datum: {record.date}</span>
                                        </div>
                                    </div>

                                    {/* Specifični detalji po tipu */}
                                    {record.category === "pregled" && (
                                        <div className="text-sm text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl">
                                            {record.doctorName && <p><strong>Lekar:</strong> {record.doctorName}</p>}
                                            {record.clinic && <p><strong>Ustanova:</strong> {record.clinic}</p>}
                                            {record.nextCheckupDate && (
                                                <p className="text-teal-700 font-medium">
                                                    Sledeća kontrola: {record.nextCheckupDate}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {record.category === "vakcina" && (
                                        <div className="text-sm text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl">
                                            <p><strong>Doza:</strong> {record.doseNumber}</p>
                                            {record.nextDoseDate && (
                                                <p className="text-emerald-700 font-medium">
                                                    Sledeća doza: {record.nextDoseDate}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {record.category === "lek" && (
                                        <div className="text-sm text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl">
                                            {record.dosage && <p><strong>Doza:</strong> {record.dosage}</p>}
                                            {record.frequency && <p><strong>Uzimanje:</strong> {record.frequency}</p>}
                                            {record.reminderTime && (
                                                <p className="inline-flex items-center gap-1 text-amber-700 font-medium">
                                                    <Clock className="w-3.5 h-3.5" /> Podsetnik u {record.reminderTime}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {record.notes && (
                                        <p className="text-sm text-slate-600 italic border-l-2 border-slate-200 pl-3">
                                            {record.notes}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default Records