import { Link, useParams } from "react-router-dom"

function ArtistPage() {

    const {name} = useParams()

    return (
        <div style={{ padding: '20px' }}>
            <h1>Stranica izvođača: {name}</h1>
            <Link to="/">← Nazad na početnu</Link>
        </div>
    )
}

export default ArtistPage