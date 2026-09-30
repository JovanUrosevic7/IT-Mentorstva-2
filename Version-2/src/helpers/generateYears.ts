

export function generateYears(from: number, ageSelect: HTMLSelectElement | null, defaultYear: null | number ): void{

    for(let i=1960; i<=2026;i++){
        let optionElement = document.createElement("option")
        optionElement.value = i.toString()
        optionElement.innerHTML = i.toString()

        if(i === defaultYear){
            optionElement.selected = true
        }

        ageSelect?.append(optionElement)
    }


}