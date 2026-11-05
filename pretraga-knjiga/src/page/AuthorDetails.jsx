import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loader from "../components/Loader"
import { Alert } from "react-bootstrap"

function AuthorDetails() {

    const {id} = useParams()
    const [author, setAuthor] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const API_URL = import.meta.env.VITE_APP_OPEN_LIBRARY_API

    useEffect(() => {

        const fetchAuthorDetails = async () => {

            try{

                setLoading(true)
                const response = await axios.get(`${API_URL}/authors/${id}.json`)
                setAuthor(response.data)
            }catch(error){
                setError('Nije moguće učitati detalje ovog autora.');
                console.error(error);
            } finally {
                setLoading(false);
            }

        }

        fetchAuthorDetails()
    }, [id])

    if (loading) return <div className="container py-5"><Loader /></div>;
    if (error) return <div className="container py-5"><Alert variant="danger">{error}</Alert></div>;
    if (!author) return null;

    let bio = 'Nema biografije za ovog autora.'
    if(typeof author.bio === "string"){
        bio = author.bio
    } else if(author.bio && author.bio.value){
        bio = author.bio.value
    } 

    const photoId = author.photos && author.photos.length > 0 ? author.photos[0] : null
    const photoUrl = photoId 
        ? `${import.meta.env.VITE_APP_COVER_API}/a/id/${photoId}-L.jpg` 
        : 'https://via.placeholder.com/250x350?text=Nema+slike';

    return (
        <div className="container py-5">
            <Link to="/" className="btn btn-outline-secondary mb-4">
                ← Nazad na pretragu
            </Link>

            <div className="row g-5 align-items-start">
                {/* Slika autora */}
                <div className="col-md-4 text-center">
                    <img 
                        src={photoUrl} 
                        alt={author.name} 
                        className="img-fluid rounded-4 shadow-lg" 
                        style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                </div>
                
                {/* Informacije o autoru */}
                <div className="col-md-8">
                    <h1 className="fw-bold text-dark mb-2">{author.name}</h1>
                    
                    {author.birth_date && (
                        <p className="text-muted mb-4">
                            <strong>Rođen/a:</strong> {author.birth_date} {author.death_date ? `- Preminuo/la: ${author.death_date}` : ''}
                        </p>
                    )}

                    <h5 className="fw-semibold text-secondary mt-4">Biografija:</h5>
                    <p className="text-muted leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
                        {bio}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AuthorDetails