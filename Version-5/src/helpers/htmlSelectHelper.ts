

export function fillSelectWithOptions(elementId: string, data: any): void{

    const select = document.getElementById(elementId) as HTMLSelectElement

    data.forEach(option => {
        
        const optionData = buildValueAndTextBasendOnType(option)

        const selectOption = document.createElement("option") as HTMLOptionElement
        selectOption.value = optionData.value
        selectOption.textContent = optionData.text
        select.append(selectOption)

    })

}


function buildValueAndTextBasendOnType(option): {value: string, text: string } {

    if(typeof option.strCategory === "string"){
        return {
            value: option.strCategory,
            text: option.strCategory
        }
        
    }else if(typeof option.strIngredient === "string"){
        return {
            value: option.strIngredient,
            text: option.strIngredient
        }        
    } else if (typeof option.strArea === "string"){
        return {
            value: option.strArea,
            text: option.strArea
        }
        
    }

}