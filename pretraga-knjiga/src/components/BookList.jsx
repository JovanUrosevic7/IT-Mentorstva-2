import BookCard from "./BookCard"

function BookList({booksData}) {
  return (
    <div className="row g-4">
        {booksData.map((book, index) => (
            <div key={book.key || index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <BookCard book={book} />
            </div>
        ))}
    </div>
  )
}

export default BookList