import { useEffect, useState } from "react"
import axios from "axios"
import { Alert } from 'react-bootstrap';
import BookList from "../components/BookList";

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
            setLoading(false)
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
                <BookList booksData={books} />
            )}
        </div>
    )
}

export default Home