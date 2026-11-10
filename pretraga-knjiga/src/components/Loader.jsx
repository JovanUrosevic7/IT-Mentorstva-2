import { Spinner } from "react-bootstrap"

function Loader() {
    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Učitavanje...</span>
            </Spinner>
        </div>
    )
}

export default Loader