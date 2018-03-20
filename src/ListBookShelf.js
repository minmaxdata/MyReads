import React from 'react'
import Book from './Book'

const ListBookShelf = (props) => {
 
    const {books, shelf, onChangeShelf} = props
    const filteredBooks = books.filter( item => item.shelf.toLowerCase() === shelf.replace(/\s/g, '').toLowerCase())
             
           
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title"> {shelf} </h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {filteredBooks.map(book => {
              return (
                <Book
                  book={book}
                  shelf={shelf}
                  key={book.id}
                  onChangeShelf={onChangeShelf}
                />
              )}
            )}
            </ol>
          </div>
        </div> 
      )
   } 

export default ListBookShelf