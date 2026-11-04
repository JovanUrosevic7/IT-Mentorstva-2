import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

export default function NotFound() {
    return (
        <Container className="text-center py-5 my-auto">
            <div className="py-5">
                <h1 className="display-1 fw-bold text-primary mb-3">404</h1>
                <h2 className="fw-semibold text-dark mb-3">Stranica nije pronađena</h2>
                <p className="text-muted mb-4 lead">
                    Izgleda da stranica koju tražite ne postoji ili je premeštena.
                </p>
                <Button as={Link} to="/" variant="primary" size="lg" className="px-4">
                    ← Nazad na početnu stranu
                </Button>
            </div>
        </Container>
    );
}