import { BudgetTracker } from "./namespaces/BudgetTracker/BudgetTracker"


namespace App{

    export function Init(){
        BudgetTracker.Finances.addExpense("Tastatura", "300")
        BudgetTracker.Finances.addExpense("Mis", "200")
        BudgetTracker.UI.showBudgetExpenses()
    }

}

App.Init()