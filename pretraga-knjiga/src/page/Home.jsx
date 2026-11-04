import { useEffect, useState } from "react"
import axios from "axios"
import { Alert, Button } from 'react-bootstrap';
import BookList from "../components/BookList";
import SearchForm from "../components/SearchForm";
import Loader from "../components/Loader";

function Home() {

    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)
    const [currentParams, setCurrentParams] = useState({ query: "the", searchType: "subject", language: "" })

    const [currentQuery, setCurrentQuery] = useState("the")
    const [currentSearchType, setCurrentSearchType] = useState("title")
    const [currentLanguage, setCurrentLanguage] = useState("")

    const API_URL = import.meta.env.VITE_APP_OPEN_LIBRARY_API

    const fetchBooks = async (query, searchType, language, pageNum) => {

        setLoading(true)
        setError(null)

        try {

            let url = `${API_URL}/search.json?limit=20&`

            if (searchType === "subject") {
                url += `subject=${query}&page=${pageNum}`
            } else if (searchType === "title") {
                url += `title=${encodeURIComponent(query)}&page=${pageNum}`
            } else if (searchType === "author") {
                url += `author=${encodeURIComponent(query)}&page=${pageNum}`
            }

            if (language) {
                url += `&language=${language}`
            }

            const response = await axios.get(url)
            setBooks(response.data.docs)

        } catch (error) {
            setError("Došlo je do greške prilikom preuzimanja podataka. Proverite internet konekciju.")
            console.error(error);
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchBooks(currentQuery, currentSearchType, currentLanguage, page)
    }, [page])

    const handleSearchForm = ({ query, searchType, language }) => {

        const finalQuery = query.trim() === "" ? "the" : query

        setCurrentQuery(finalQuery)
        setCurrentSearchType(searchType)
        setCurrentLanguage(language)

        if(page === 1){
            fetchBooks(finalQuery, searchType, language, 1)
        } else {
            setPage(1)
        }

    }


    console.log(books);

    return (
        <div className="container py-5">
            <h1 className="mb-4 text-center fw-bold text-dark">🔍 Pretraga Knjiga</h1>

            {/* Forma za pretragu */}
            <SearchForm onSearch={handleSearchForm} />

            {error && <Alert variant="danger">{error}</Alert>}

            {/* Sadržaj: Loader, poruka ako nema rezultata, ili lista knjiga */}
            {loading ? (
                <Loader />
            ) : (
                <>
                    {books.length === 0 ? (
                        <Alert variant="warning" className="text-center">
                            Nema pronađenih knjiga za vaš zahtev.
                        </Alert>
                    ) : (
                        <>
                            <BookList booksData={books} />

                            {/* Kontrole za paginaciju */}
                            <div className="d-flex justify-content-between align-items-center mt-5">
                                <Button
                                    variant="secondary"
                                    disabled={page === 1 || loading}
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                >
                                    ← Prethodna
                                </Button>
                                <span className="fw-semibold text-secondary">Strana {page}</span>
                                <Button
                                    variant="secondary"
                                    disabled={books.length < 10 || loading}
                                    onClick={() => setPage(prev => prev + 1)}
                                >
                                    Sledeća →
                                </Button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default Home