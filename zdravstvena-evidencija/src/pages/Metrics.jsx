import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { useAuth } from "../context/AuthContext";
import {
    addHealthMetric,
    getUserMetrics,
    deleteHealthMetric,
} from "../services/metricService";
import { toast } from "react-toastify";
import { Activity, Plus, Trash2 } from "lucide-react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


const METRIC_TYPES = {
    pritisak: {
        label: "Krvni pritisak (mmHg)",
        unit: "mmHg",
        hasSecondary: true,
        primaryLabel: "Sistolni (gornji)",
        secondaryLabel: "Dijastolni (donji)",
    },
    tezina: {
        label: "Telesna težina (kg)",
        unit: "kg",
        hasSecondary: false,
        primaryLabel: "Težina (kg)",
    },
    secer: {
        label: "Šećer u krvi (mmol/L)",
        unit: "mmol/L",
        hasSecondary: false,
        primaryLabel: "Glukoza (mmol/L)",
    },
};




function Metrics() {

    const { currentUser } = useAuth();
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedType, setSelectedType] = useState("pritisak");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [value, setValue] = useState("");
    const [secondaryValue, setSecondaryValue] = useState("");
    const [note, setNote] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        async function loadMetrics() {
            try {
                const data = await getUserMetrics(currentUser.uid);
                setMetrics(data);
            } catch (error) {
                console.error(error);
                toast.error("Greška pri učitavanju zdravstvenih parametara.");
            } finally {
                setLoading(false);
            }
        }

        if (currentUser) loadMetrics();
    }, [currentUser]);

    async function handleAddMetric(e) {
        e.preventDefault();
        const numValue = Number(value);
        if (!value || Number.isNaN(numValue)) {
            return toast.error("Unesite ispravnu numeričku vrednost.");
        }

        const config = METRIC_TYPES[selectedType];
        const numSecondary = config.hasSecondary ? Number(secondaryValue) : null;

        if (config.hasSecondary && (!secondaryValue || Number.isNaN(numSecondary))) {
            return toast.error("Unesite i donji (dijastolni) pritisak.");
        }

        try {
            setSubmitting(true);
            const newMetric = {
                type: selectedType,
                date,
                value: numValue,
                ...(config.hasSecondary && { secondaryValue: numSecondary }),
                note: note.trim(),
            };

            const id = await addHealthMetric(currentUser.uid, newMetric);
            const updated = [...metrics, { id, ...newMetric }].sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            setMetrics(updated);
            setValue("");
            setSecondaryValue("");
            setNote("");
            toast.success("Parametar je dodat na grafikon!");
        } catch (error) {
            console.error(error);
            toast.error("Greška pri čuvanju parametra.");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(id) {
        try {
            await deleteHealthMetric(id);
            setMetrics((prev) => prev.filter((item) => item.id !== id));
            toast.success("Merenje je obrisano.");
        } catch (error) {
            console.error(error);
            toast.error("Greška pri brisanju merenja.");
        }
    }

    const filteredMetrics = metrics.filter((m) => m.type === selectedType);
    const currentConfig = METRIC_TYPES[selectedType];

    const chartData = {
        labels: filteredMetrics.map((m) => m.date),
        datasets: [
            {
                label: currentConfig.primaryLabel,
                data: filteredMetrics.map((m) => m.value),
                borderColor: "#0d9488",
                backgroundColor: "rgba(13, 148, 136, 0.12)",
                tension: 0.35,
                fill: !currentConfig.hasSecondary,
                pointRadius: 4,
            },
            ...(currentConfig.hasSecondary
                ? [
                    {
                        label: currentConfig.secondaryLabel,
                        data: filteredMetrics.map((m) => m.secondaryValue),
                        borderColor: "#0284c7",
                        backgroundColor: "rgba(2, 132, 199, 0.12)",
                        tension: 0.35,
                        fill: false,
                        pointRadius: 4,
                    },
                ]
                : []),
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" },
        },
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Grafikoni i parametri zdravlja</h1>
                <p className="text-sm text-slate-500">
                    Pratite promene krvnog pritiska, težine ili šećera u krvi kroz vreme
                </p>
            </div>

            {/* Izbor parametra */}
            <div className="flex flex-wrap gap-2">
                {Object.entries(METRIC_TYPES).map(([key, cfg]) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedType(key)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${selectedType === key
                            ? "bg-teal-600 text-white"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        <Activity className="w-4 h-4" />
                        {cfg.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Grafikon */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">{currentConfig.label}</h2>
                    {loading ? (
                        <div className="h-72 flex items-center justify-center text-slate-500">
                            Učitavanje grafikona...
                        </div>
                    ) : filteredMetrics.length === 0 ? (
                        <div className="h-72 flex items-center justify-center text-slate-500 text-center px-4">
                            Još uvek nema unetih vrednosti za ovu kategoriju. Dodajte prvo merenje desno.
                        </div>
                    ) : (
                        <div className="h-72">
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    )}
                </div>

                {/* Forma za novo merenje */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Novo merenje</h2>
                    <form onSubmit={handleAddMetric} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Datum</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <div className={currentConfig.hasSecondary ? "grid grid-cols-2 gap-3" : ""}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    {currentConfig.primaryLabel} *
                                </label>
                                <input
                                    type="number"
                                    step="any"
                                    required
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder={selectedType === "pritisak" ? "120" : selectedType === "tezina" ? "75.5" : "5.4"}
                                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {currentConfig.hasSecondary && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        {currentConfig.secondaryLabel} *
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        required
                                        value={secondaryValue}
                                        onChange={(e) => setSecondaryValue(e.target.value)}
                                        placeholder="80"
                                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Napomena (opciono)
                            </label>
                            <input
                                type="text"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="npr. ujutru na tašte"
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-xl transition-colors cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            {submitting ? "Čuvanje..." : "Dodaj merenje"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Istorija merenja za izabrani tip */}
            {filteredMetrics.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                    <h3 className="text-base font-bold text-slate-900 mb-3">Istorija merenja</h3>
                    <div className="divide-y divide-slate-100">
                        {[...filteredMetrics].reverse().map((m) => (
                            <div key={m.id} className="py-3 flex items-center justify-between gap-4 text-sm">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="font-medium text-slate-700">{m.date}</span>
                                    <span className="font-bold text-teal-700">
                                        {m.value}
                                        {currentConfig.hasSecondary ? ` / ${m.secondaryValue}` : ""} {currentConfig.unit}
                                    </span>
                                    {m.note && <span className="text-slate-500">— {m.note}</span>}
                                </div>
                                <button
                                    onClick={() => handleDelete(m.id)}
                                    title="Obriši merenje"
                                    className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Metrics