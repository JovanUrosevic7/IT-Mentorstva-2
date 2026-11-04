import { Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom";

function BookCard({ book }) {

    const coverUrl = book.cover_i
        ? `${import.meta.env.VITE_APP_COVER_API}/${book.cover_i}-M.jpg` 
        : 'https://via.placeholder.com/150x200?text=Nema+slike';

    const workId = book.key ? book.key.replace("/works/","") : ""

    return (
        <Card className="h-100 shadow-sm border-0">
            <Card.Img 
                variant="top" 
                src={coverUrl} 
                alt={book.title} 
                style={{ height: '280px', objectFit: 'contain' }} 
            />
            <Card.Body className="d-flex flex-column justify-between">
                <div>
                    <Card.Title className="fs-6 fw-bold text-truncate" title={book.title}>
                        {book.title}
                    </Card.Title>
                    <Card.Text className="text-muted small mb-1">
                        Autor: {book.author_name ? book.author_name.join(', ') : 'Nepoznat autor'}
                    </Card.Text>
                    <Card.Text className="text-secondary small">
                        Prvo izdanje: {book.first_publish_year || 'N/A'}
                    </Card.Text>
                </div>
                
                {workId && (
                    <Button 
                        as={Link} 
                        to={`/book/${workId}`} 
                        variant="outline-primary" 
                        size="sm" 
                        className="mt-3 w-100"
                    >
                        Detaljnije
                    </Button>
                )}
            </Card.Body>
        </Card>
    )
}

export default BookCard