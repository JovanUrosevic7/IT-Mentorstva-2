import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pill, Stethoscope, Syringe } from "lucide-react";
import { addHealthRecord } from "../services/recordService";



function AddRecord() {

    const { currentUser } = useAuth()
    const navigate = useNavigate();

    const [category, setCategory] = useState("pregled"); // "pregled" | "vakcina" | "lek"
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [notes, setNotes] = useState("");

    // Specifična polja za pregled
    const [doctorName, setDoctorName] = useState("");
    const [clinic, setClinic] = useState("");
    const [nextCheckupDate, setNextCheckupDate] = useState("");

    // Specifična polja za vakcinu
    const [doseNumber, setDoseNumber] = useState("1. doza");
    const [nextDoseDate, setNextDoseDate] = useState("");

    // Specifična polja za lek
    const [dosage, setDosage] = useState("");
    const [frequency, setFrequency] = useState("");
    const [reminderTime, setReminderTime] = useState("08:00");

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) return toast.error("Unesite naziv evidencije.");

        const recordData = {
            category,
            title: title.trim(),
            date,
            notes: notes.trim(),
            ...(category === "pregled" && {
                doctorName: doctorName.trim(),
                clinic: clinic.trim(),
                nextCheckupDate,
            }),
            ...(category === "vakcina" && {
                doseNumber,
                nextDoseDate,
            }),
            ...(category === "lek" && {
                dosage: dosage.trim(),
                frequency: frequency.trim(),
                reminderTime,
                isActive: true,
            }),
        };

        try {
            setLoading(true);
            await addHealthRecord(currentUser.uid, recordData);
            toast.success("Zdravstvena evidencija je uspešno sačuvana!");
            navigate("/records");
        } catch (error) {
            console.error(error);
            toast.error("Greška pri čuvanju podataka.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" /> Nazad
            </button>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Nova zdravstvena evidencija</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Izaberite kategoriju i unesite detalje u vaš lični karton.
                    </p>
                </div>

                {/* Odabir kategorije */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { id: "pregled", label: "Pregled", icon: Stethoscope },
                        { id: "vakcina", label: "Vakcina", icon: Syringe },
                        { id: "lek", label: "Lek / Terapija", icon: Pill },
                    ].map((item) => {
                        const Icon = item.icon;
                        const active = category === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setCategory(item.id)}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${active
                                    ? "bg-teal-50 border-teal-600 text-teal-700 shadow-xs"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Zajednička polja */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                {category === "pregled"
                                    ? "Vrsta pregleda *"
                                    : category === "vakcina"
                                        ? "Naziv vakcine *"
                                        : "Naziv leka *"}
                            </label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={
                                    category === "pregled"
                                        ? "npr. Kardiološki pregled"
                                        : category === "vakcina"
                                            ? "npr. Tetanus / Sezonski grip"
                                            : "npr. Vitamin D3 / Brufen"
                                }
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                {category === "lek" ? "Početak terapije *" : "Datum *"}
                            </label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    {/* Polja specifična za PREGLED */}
                    {category === "pregled" && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Ime lekara
                                </label>
                                <input
                                    type="text"
                                    value={doctorName}
                                    onChange={(e) => setDoctorName(e.target.value)}
                                    placeholder="Dr Marković"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Ustanova / Klinika
                                </label>
                                <input
                                    type="text"
                                    value={clinic}
                                    onChange={(e) => setClinic(e.target.value)}
                                    placeholder="Dom zdravlja"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Sledeća kontrola
                                </label>
                                <input
                                    type="date"
                                    value={nextCheckupDate}
                                    onChange={(e) => setNextCheckupDate(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </div>
                    )}

                    {/* Polja specifična za VAKCINU */}
                    {category === "vakcina" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Doza
                                </label>
                                <select
                                    value={doseNumber}
                                    onChange={(e) => setDoseNumber(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                                >
                                    <option value="1. doza">1. doza</option>
                                    <option value="2. doza">2. doza</option>
                                    <option value="3. doza">3. doza</option>
                                    <option value="Revakcina">Revakcina</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Datum sledeće doze (opciono)
                                </label>
                                <input
                                    type="date"
                                    value={nextDoseDate}
                                    onChange={(e) => setNextDoseDate(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </div>
                    )}

                    {/* Polja specifična za LEK */}
                    {category === "lek" && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Doza leka
                                </label>
                                <input
                                    type="text"
                                    value={dosage}
                                    onChange={(e) => setDosage(e.target.value)}
                                    placeholder="npr. 500 mg / 1 tableta"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Učestalost
                                </label>
                                <input
                                    type="text"
                                    value={frequency}
                                    onChange={(e) => setFrequency(e.target.value)}
                                    placeholder="npr. 2x dnevno posle jela"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Vreme podsetnika
                                </label>
                                <input
                                    type="time"
                                    value={reminderTime}
                                    onChange={(e) => setReminderTime(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </div>
                    )}

                    {/* Napomena */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Dodatne napomene / Terapija / Rezultati
                        </label>
                        <textarea
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Unesite zaključak lekara, preporuke ili napomene..."
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                        {loading ? "Čuvanje..." : "Sačuvaj evidenciju"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddRecord