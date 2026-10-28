import { getLinks, saveLinks } from '@/src/lib/db';
import { NextResponse } from "next/server"

export async function GET(request, {params}){

    const {code} = await params
    const links = getLinks()
    const link = links.find(l => l.code === code)

    if(!link){
        return NextResponse.json(
            {error: "Link nije pronađen."},
            {status: 404}
        )
    }

    return NextResponse.json(link)

}

export async function DELETE(request, {params}){

    const {code} = await params
    let links = getLinks()
    const index = links.findIndex(l => l.code === code)

    if(index === -1){
        return NextResponse.json({ error: 'Link nije pronađen.' }, { status: 404 });
    }

    links.splice(index, 1)
    saveLinks(links)

    return NextResponse.json({ message: 'Link uspešno obrisan.' }, { status: 200 });
}





