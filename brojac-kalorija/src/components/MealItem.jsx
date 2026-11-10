function MealItem({ meal, onDelete }) {
  // Pomoćna funkcija za lepe boje oznaka prema vrsti obroka
  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'dorucak': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'rucak': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'vecera': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'uzina': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (

    <div className="bg-white border border-slate-200/80 px-4 py-3 rounded-xl shadow-xs hover:border-slate-300 transition-all">

      <div className="grid grid-cols-4 items-center ">

        {/* Naziv obroka */}
        <p className="font-semibold text-slate-800 text-sm truncate pr-2">{meal.name}</p>

        {/* Kalorije */}
        <p className="text-sm font-medium text-blue-600 text-center">{meal.calories} <span className="text-xs text-slate-400">kcal</span></p>

        {/* Vrsta obroka sa stilizovanom badge oznakom */}
        <div className="flex justify-center">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full border capitalize ${getTypeBadgeStyle(meal.mealType)}`}>
            {meal.mealType}
          </span>
        </div>

        {/* Dugme za brisanje */}
        <div className="flex justify-end">
          <button
            onClick={() => onDelete(meal.id)}
            className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-rose-100"
          >
            Obriši
          </button>
        </div>

      </div>

      {/* Prikaz makroa (prikazuje se samo ako je unet bar jedan makro) */}
      {(meal.proteins > 0 || meal.carbohydrates > 0 || meal.fats > 0) && (
        <div className="flex gap-4 text-[11px] text-slate-500 border-t border-slate-100 pt-1.5 mt-1">
          <span>Proteini: <strong className="text-slate-700">{meal.proteins}g</strong></span>
          <span>Ugljeni hidrati: <strong className="text-slate-700">{meal.carbohydrates}g</strong></span>
          <span>Masti: <strong className="text-slate-700">{meal.fats}g</strong></span>
        </div>
      )}
    </div>
  )
}

export default MealItem