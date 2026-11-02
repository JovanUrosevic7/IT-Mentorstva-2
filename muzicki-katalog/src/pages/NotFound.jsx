import { Link } from "react-router-dom"

function NotFound() {


  return (
    <div>
        <h1>404 - Stranica nije pronađena</h1>
        <p>Tražena adresa ne postoji.</p>
        <Link to="/">Idi na početnu stranicu</Link>
    </div>
  )
}

export default NotFound