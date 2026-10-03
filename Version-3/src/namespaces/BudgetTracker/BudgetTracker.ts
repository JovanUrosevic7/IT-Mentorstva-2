export namespace BudgetTracker{

    export namespace Finances{

        const SOTRAGE_KEY = "expenses"

        interface Expense {

            expense: string,
            amount: string

        }


        export function addExpense(expense: string, amount: string): void{

            const expenses = getAllExpenses()

            if(expenseExist(expense, expenses)){
                return
            }

            expenses.push({expense: expense, amount: amount})

            localStorage.setItem(SOTRAGE_KEY, JSON.stringify(expenses))

        }

        function expenseExist(expense: string, expenses: Expense[]): boolean{
            return expenses.some(e => e.expense.toLowerCase() === expense.toLocaleLowerCase())
        }

        export function getAllExpenses(): Expense[] {
            const data = localStorage.getItem(SOTRAGE_KEY)
            return data ? JSON.parse(data) : []
        }

    }

    export namespace UI{

        import getAllExpenses = BudgetTracker.Finances.getAllExpenses   

        export function showBudgetExpenses(): void{

            const data = getAllExpenses()
            
            data.forEach(expense => {

                const budgetDiv = document.querySelector("#budgetDiv") as HTMLDivElement
                budgetDiv.innerHTML += `<p>${expense.expense} - ${expense.amount}</p>`
            })

        }
    }

    

}