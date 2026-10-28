import { getLinks, saveLinks } from '@/src/lib/db';
import { redirect } from 'next/navigation';

export async function RedirectPage({params}){

    const {code} = await params

    const links = getLinks()
    const linkIndex = links.findIndex(l => l.code === code)

    if(findIndex === -1){
        return (
            <main style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
                <h1>404 - Link nije pronađen</h1>
                <p>Traženi kratak link ne postoji ili je obrisan.</p>
                <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Nazad na početnu</a>
            </main>
        );
    }

    links[linkIndex].clicks += 1
    saveLinks(links)

    redirect(links[linkIndex].originalUrl)


}







