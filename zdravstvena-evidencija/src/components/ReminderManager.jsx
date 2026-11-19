import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

function getCurrentHHMM() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}

export default function ReminderManager({ records = [] }) {
    const notifiedKeysRef = useRef(new Set());
    const upcomingShownRef = useRef(false);

    // Obaveštenje o zakazanim kontrolama / dozama u narednih 7 dana (jednom po sesiji)
    useEffect(() => {
        if (!records.length || upcomingShownRef.current) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inSevenDays = new Date(today);
        inSevenDays.setDate(today.getDate() + 7);

        const upcoming = records.filter((rec) => {
            const targetDateStr = rec.nextCheckupDate || rec.nextDoseDate;
            if (!targetDateStr) return false;
            const targetDate = new Date(targetDateStr);
            return targetDate >= today && targetDate <= inSevenDays;
        });

        if (upcoming.length > 0) {
            upcomingShownRef.current = true;
            toast.info(
                `Imate ${upcoming.length} zakazanu obavezu u narednih 7 dana (${upcoming[0].title}).`,
                { autoClose: 6000 }
            );
        }
    }, [records]);

    // Podsetnici za lekove u tačno zadato vreme
    useEffect(() => {
        const medsWithReminder = records.filter(
            (rec) => rec.category === "lek" && rec.reminderTime && rec.isActive !== false
        );

        if (!medsWithReminder.length) return;

        function checkMedicationReminders() {
            const currentTime = getCurrentHHMM();
            const todayKey = new Date().toISOString().split("T")[0];

            medsWithReminder.forEach((med) => {
                if (med.reminderTime === currentTime) {
                    const toastKey = `${med.id}-${todayKey}-${currentTime}`;
                    if (!notifiedKeysRef.current.has(toastKey)) {
                        notifiedKeysRef.current.add(toastKey);
                        toast.warning(
                            `Vreme je za lek: ${med.title}${med.dosage ? ` (${med.dosage})` : ""}!`,
                            { autoClose: false }
                        );
                    }
                }
            });
        }

        checkMedicationReminders();
        const intervalId = setInterval(checkMedicationReminders, 30000);

        return () => clearInterval(intervalId);
    }, [records]);

    return null;
}