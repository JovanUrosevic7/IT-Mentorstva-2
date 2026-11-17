import { useState } from "react"
import StepOne from "./StepOne"
import StepThree from "./StepThree"
import StepTwo from "./StepTwo"

function Home() {

  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    linkedin: "",
    jobs: [{ company: "", position: "", startDate: "", endDate: "" }],
    skills: [],
    experienceYears: "",
    expectedSalary: "",
    coverLetter: ""
  })

  const updateFormData = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }))
  }

  const prevStep = () => setCurrentStep((prev) => prev - 1)
  const nextStep = () => setCurrentStep((prev) => prev + 1)

  const calculateTotalExperience = () => {

    let totalDays = 0
    formData.jobs.forEach((job) => {

      if (job.startDate) {
        const start = new Date(job.startDate)
        const end = job.endDate ? new Date(job.endDate) : new Date()

        if (end > start) {
          totalDays += (end - start) / (1000 * 60 * 60 * 24)
        }
      }

    })

    const years = (totalDays / 365.25).toFixed(1)

    return years

  }

  const handleFinalSubmit = () => {

    console.log("Konačni podaci prijave za posao:", formData);
    alert("Uspešno ste poslali prijavu! Hvala vam.");

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      city: "",
      linkedin: "",
      jobs: [{ company: "", position: "", startDate: "", endDate: "" }],
      skills: [],
      experienceYears: "",
      expectedSalary: "",
      coverLetter: ""
    });
    setCurrentStep(1);

  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Indikator koraka (Progress Bar / Stepper) */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
          <span className={currentStep === 1 ? "text-blue-600 dark:text-blue-400" : ""}>1. Lični podaci</span>
          <span className={currentStep === 2 ? "text-blue-600 dark:text-blue-400" : ""}>2. Iskustvo</span>
          <span className={currentStep === 3 ? "text-blue-600 dark:text-blue-400" : ""}>3. Veštine</span>
          <span className={currentStep === 4 ? "text-blue-600 dark:text-blue-400" : ""}>4. Pregled</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Prikazivanje odgovarajućeg koraka */}
      {currentStep === 1 && (
        <StepOne
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
        />
      )}

      {currentStep === 2 && (
        <StepTwo
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 3 && (
        <StepThree
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {currentStep === 4 && (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Pregled unetih podataka</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Proverite podatke pre konačne potvrde prijave.</p>

          {/* Pregled ličnih podataka */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-2 text-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Lični podaci</h3>
            <p><strong className="text-gray-600 dark:text-gray-400">Ime i prezime:</strong> {formData.fullName}</p>
            <p><strong className="text-gray-600 dark:text-gray-400">Email:</strong> {formData.email}</p>
            <p><strong className="text-gray-600 dark:text-gray-400">Telefon:</strong> {formData.phone}</p>
            <p><strong className="text-gray-600 dark:text-gray-400">Grad:</strong> {formData.city}</p>
            {formData.linkedin && <p><strong className="text-gray-600 dark:text-gray-400">LinkedIn:</strong> {formData.linkedin}</p>}
          </div>

          {/* Pregled radnog iskustva */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-3 text-sm">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Radno iskustvo</h3>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-md">
                Ukupno izračunato iskustvo: ~{calculateTotalExperience()} godina
              </span>
            </div>
            {formData.jobs.map((job, idx) => (
              <div key={idx} className="border-l-2 border-blue-600 pl-3 space-y-1">
                <p className="font-medium text-gray-900 dark:text-white">{job.position} u <span className="text-blue-600 dark:text-blue-400">{job.company}</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Period: {job.startDate} do {job.endDate || "Trenutno"}</p>
              </div>
            ))}
          </div>

          {/* Pregled veština i očekivanja */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-2 text-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Veštine i očekivanja</h3>
            <div>
              <strong className="text-gray-600 dark:text-gray-400 block mb-1">Izabrane veštine:</strong>
              <div className="flex flex-wrap gap-1.5">
                {formData.skills.map((skill, idx) => (
                  <span key={idx} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2.5 py-1 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <p className="pt-2"><strong className="text-gray-600 dark:text-gray-400">Godine unetog iskustva:</strong> {formData.experienceYears}</p>
            <p><strong className="text-gray-600 dark:text-gray-400">Očekivana plata:</strong> {formData.expectedSalary} EUR</p>
          </div>

          {/* Pregled propratnog pisma */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl space-y-2 text-sm">
            <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Propratno pismo</h3>
            <p className="text-gray-700 dark:text-gray-300 italic whitespace-pre-wrap">{formData.coverLetter}</p>
          </div>

          {/* Navigaciona dugmad za pregled */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Nazad
            </button>
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-3 rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              Potvrdi i pošalji prijavu ✓
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home