

namespace BudgetTracker{

    export namespace Finances{
        export function addExpense(expense: string, amount: string): void{

            const expenses = getAllExpenses()

            expenses.push({expense: expense, amount: amount})

            localStorage.setItem("expenses", JSON.stringify(expenses))

        }

        export function getAllExpenses(){
            const data = localStorage.getItem("expenses")
            return data ? JSON.parse(data) : []
        }

    }

    export namespace UI{

        import getAllExpences = BudgetTracker.Finances.getAllExpenses   

        export function showBudgetExpenses(): void{

            const data = getAllExpences()
            
            data.forEach(expense => {

                const budgetDiv = document.querySelector("#budgetDiv") as HTMLDivElement
                budgetDiv.innerHTML += `<p>${expense.expense} - ${expense.amount}</p>`
            })

        }
    }

    

}

BudgetTracker.Finances.addExpense("komp","2000")
BudgetTracker.Finances.addExpense("mis","200")
BudgetTracker.UI.showBudgetExpenses()