
import { getLinks, saveLinks } from "@/lib/db";
import { NextResponse } from "next/server"


function generateShortCode() {

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ""
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return result

}

export async function GET(request) {

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""

    const links = getLinks()

    if (search) {
        const filtered = links.filter(link =>
            link.originalUrl.toLowerCase().includes(search.toLowerCase()) ||
            link.code.toLowerCase().includes(search.toLowerCase())
        )

        return NextResponse.json(filtered)
    }

    return NextResponse.json(links)

}


export async function POST(request) {

    try {

        const body = await request.json()
        const { originalUrl, customCode, expiresAt } = body

        if (!originalUrl || (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://"))) {
            return NextResponse.json(
                { error: "URL mora počinjati sa http:// ili https:// i biti ispravan." },
                { status: 400 }
            )
        }

        let links = getLinks()
        let code = customCode

        if (code) {

            const codeRegex = /^[a-zA-Z0-9-]+$/;

            if (code.length < 3 || code.length > 20 || !codeRegex.test(code)) {
                return NextResponse.json(
                    { error: 'Custom kod mora imati između 3 i 20 karaktera i sadržati samo slova, cifre i crtice.' },
                    { status: 400 }
                )
            }

            const exists = links.find(l => l.code === code)
            if (exists) {
                return NextResponse.json(
                    { error: "Ovaj custom kod već postoji." },
                    { status: 409 }
                )
            }

        }

        else {

            do {
                code = generateShortCode()
            } while (links.some(l => l.code === code))

        }

        

        const newLink = {
            code,
            originalUrl,
            clicks: 0,
            createdAt: new Date().toISOString(),
            expiresAt: expiresAt || null
        }

        links.push(newLink)
        saveLinks(links)

        return NextResponse.json(newLink, { status: 201 })
    }

    catch (error) {
        console.error("DETALJNA GRESKA:", error); // <-- Dodaj ovo
        return NextResponse.json(
            { error: "Došlo je do greške na serveru." },
            { status: 500 }
        )
    }

}


