export const trimValue = (value) => (typeof value === "string" ? value.trim() : value)

export const validateName = (value) => {

    const trimmed = trimValue(value)
    if(!trimmed) return "Ovo polje je obavezno"
    if(/\d/.test(trimmed)) return "Ime i prezime ne smeju sadržati cifre."
    return true
}

export const validateEmail = (value) => {

    const trimmed = trimValue(value)
    if(!trimmed) return "Ovo polje je obavezno"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(trimmed)) return "Unesite validnu email adresu."
    return true
}

export const validatePhone = (value) => {

    const trimmed = trimValue(value)
    if(!trimmed) return "Ovo polje je obavezno"
    const phoneRegex = /^(\+381|\+387|\+385)\d{6,10}$/;
    if(!phoneRegex.test(trimmed)){
        return "Broj telefona mora počinjati sa +381, +387 ili +385 i sadržati važeći broj.";
    }
    return true
}

export const validateCity = (value) => {

    const trimmed = trimValue(value)
    if(!trimmed) return "Ovo polje je obavezno"
    return true
}

export const validateLinkedIn = (value) => {

    const trimmed = trimValue(value)
    if(!trimmed) return true
    if(trimmed.startsWith("https://www.linkedin.com/")){
        return "LinkedIn URL mora počinjati sa https://www.linkedin.com/";
    }
    return true
}

export const validateEndDate = (endDate, startDate) => {

    if(!endDate) return true
    if(!startDate) return "Unesite prvo datum početka."

    const start = new Date(startDate)
    const end = new Date(endDate)

    if(end <= start){
        return "Datum završetka mora biti posle datuma početka.";
    }

    return true
}

export const validateSkills = (skills) => {

    if(!skills || skills.length < 3){
        return "Morate izabrati najmanje 3 veštine.";
    }

    return true
}

export const validateCoverLetter = (value) => {

    const trimmed = trimValue(value)
    if(!trimmed) return "Propratno pismo je obavezno"

    const wordCount = trimmed.split(/\s+/).filter(Boolean).length
    if(wordCount < 50){
        return `Propratno pismo mora imati najmanje 50 reči. Trenutno imate ${wordCount} reči.`;
    }

    return true
}
 