
function FooterBar() {



    return (
        <footer className="bg-dark text-white text-center py-4 mt-auto">
            <div className="container">
                <p className="mb-0 text-secondary text-sm">
                    &copy; {new Date().getFullYear()} Book Search App • Pokretano sa Open Library API-jem
                </p>
            </div>
        </footer>
    )
}

export default FooterBar