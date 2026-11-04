import { useEffect, useState } from "react"
import axios from "axios"
import { Alert } from 'react-bootstrap';

function Home() {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const API_URL = import.meta.env.VITE_APP_OPEN_LIBRARY_API

    const fetchBooks = async (query = "programming") => {

        setLoading(true)
        setError(null)

        try{

            const response = await axios.get(`${API_URL}/search.json?subject=${query}`)
            setBooks(response.data.docs)

        } catch (error){
            setError("Došlo je do greške prilikom preuzimanja podataka. Proverite internet konekciju.")
            console.error(error);
        }finally{
            setError(false)
        }

    }

    useEffect(() => {
        fetchBooks("programming")
    }, [])

    console.log(books);
    

    return (
        <div className="container py-5">
            <h1 className="mb-4 text-center fw-bold text-dark">🔍 Pretraga Knjiga</h1>
            
            {/* Prikaz greške ako postoji */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Privremeni prikaz statusa da vidimo da li podaci stižu */}
            {loading ? (
                <p className="text-center text-primary fw-semibold">Učitavanje knjiga sa servera...</p>
            ) : (
                <p className="text-center text-success fw-semibold">
                    Uspešno preuzeto knjiga: {books.length}
                </p>
            )}
        </div>
    )
}

export default Home