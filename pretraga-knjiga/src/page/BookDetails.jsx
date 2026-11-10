import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Alert } from "react-bootstrap";

function  BookDetails() {

    const {id} = useParams()
    const [book, setBook] = useState(null)
    const [authorsData, setAuthorsData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const API_URL = import.meta.env.VITE_APP_OPEN_LIBRARY_API;

    useEffect(() => {

        const fetchBookDetails = async () => {

            try {

                setLoading(true)
                const response = await axios.get(`${API_URL}/works/${id}.json`)
                const bookData = response.data
                setBook(bookData)

                if(bookData.authors && bookData.authors.length > 0){

                    const authorsPromise = bookData.authors.map(async(authorObj) => {
                        const authorKey = authorObj.author.key
                        const authorRes = await axios.get(`${API_URL}${authorKey}.json/`)
                        return {
                            name: authorRes.data.name,
                            key: authorKey.replace("/authors/", "")
                        }
                    })

                    const resolvedAuthors = await Promise.all(authorsPromise)
                    setAuthorsData(resolvedAuthors)
                }


            } catch (error) {
                console.error("Nije moguće učitati detalje ove knjige.");
                setError(error)
            } finally {
                setLoading(false)
            }

        }

        fetchBookDetails()

    }, [id])


    if (loading) return <div className="container py-5"><Loader /></div>;
    if (error) return <div className="container py-5"><Alert variant="danger">{error}</Alert></div>;
    if (!book) return null;

    let description = 'Nema opisa za ovu knjigu.'
    if(typeof book.description === "string"){
        description = book.description
    } else if (book.description && book.description.value){
        description = book.description.value
    }

    const coverId = book.covers && book.covers.length > 0 ? book.covers[0] : null
    const coverUrl = coverId
        ? `${import.meta.env.VITE_APP_COVER_API}/${coverId}-L.jpg` 
        : 'https://via.placeholder.com/300x450?text=Nema+slike';

    console.log(book);
    

    return (
        <div className="container py-5">
            {/* Dugme za povratak nazad na pretragu */}
            <Link to="/" className="btn btn-outline-secondary mb-4">
                ← Nazad na pretragu
            </Link>

            <div className="row g-5 align-items-start">
                {/* Velika slika korica */}
                <div className="col-md-4 text-center">
                    <img 
                        src={coverUrl} 
                        alt={book.title} 
                        className="img-fluid rounded-4 shadow-lg" 
                        style={{ maxHeight: '450px', objectFit: 'cover' }}
                    />
                </div>
                
                {/* Osnovni podaci, teme i opis */}
                <div className="col-md-8">
                    
                    <h1 className="fw-bold text-dark mb-3">{book.title}</h1>

                    <div className="mb-3">
                        <span className="fw-semibold text-secondary">Autor/i: </span>
                        {authorsData.length > 0 ? (
                            authorsData.map((author, index) => (
                                <span key={author.key}>
                                    <Link to={`/author/${author.key}`} className="text-decoration-none fw-semibold">
                                        {author.name}
                                    </Link>
                                    {index < authorsData.length - 1 ? ', ' : ''}
                                </span>
                            ))
                        ) : (
                            <span className="text-muted">Nepoznat autor</span>
                        )}
                    </div>
                    
                    {/* Prikaz tema (subjects) ako postoje */}
                    {book.subjects && (
                        <div className="mb-4">
                            <h6 className="fw-semibold text-secondary">Teme:</h6>
                            <div className="d-flex flex-wrap gap-1">
                                {book.subjects.slice(0, 12).map((subject, index) => (
                                    <span key={index} className="badge bg-light text-dark border">
                                        {subject}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <h5 className="fw-semibold text-secondary mt-4">Opis:</h5>
                    <p className="text-muted leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default BookDetails