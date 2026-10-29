import { getLinks, saveLinks } from '../../lib/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function RedirectPage({params}){

    const {code} = await params

    const links = getLinks()
    const linkIndex = links.findIndex(l => l.code === code)

    if(linkIndex === -1){
        return (
            <main style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
                <h1>404 - Link nije pronađen</h1>
                <p>Traženi kratak link ne postoji ili je obrisan.</p>
                <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Nazad na početnu</Link>
            </main>
        );
    }

    if(links[linkIndex].expiresAt){
        const expirationDate = new Date(links[linkIndex].expiresAt)
        if(new Date() > expirationDate){
            return (
                <main style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
                    <h1>⏳ Link je istekao</h1>
                    <p>Ovaj kratak link je istekao {expirationDate.toLocaleDateString()} i više nije aktivan.</p>
                    <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Nazad na početnu</Link>
                </main>
            );
        }
    }

    links[linkIndex].clicks += 1
    saveLinks(links)

    redirect(links[linkIndex].originalUrl)


}







