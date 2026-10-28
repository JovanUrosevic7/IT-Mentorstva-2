export async function fetchLinks(search = ''){

    const url = search ? `/api/links?search=${encodeURIComponent(search)}` : '/api/links';
    const response = await fetch(url)

    if(!response.ok){
        throw new Error("Greška prilikom učitavanja linkova.")
    }

    return response.json()

}

export async function createLink(originalUrl, customCode){

    const response = await fetch("/api/links",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({originalUrl, customCode})
    })

    const data = await response.json()

    if(!response.ok){
        throw { status: response.status, message: data.error || 'Došlo je do greške.' };
    }

    return data

}


export async function deleteLink(code){

    const response = await fetch("/api/links/${code}",{
        method: "DELETE",
    })

    if (!response.ok) {
        throw new Error('Greška prilikom brisanja linka.');
    }

    return response.json()

}