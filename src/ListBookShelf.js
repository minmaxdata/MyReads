import React from 'react'
import Book from './Book'

class ListBookShelf extends React.Component {
 
  render () {
    const shelf = this.props.shelf
    const books = this.props.books
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
                  onChangeShelf={this.props.onChangeShelf}
                />
              )}
            )}
            </ol>
          </div>
        </div> 
      )
   } 
}

export default ListBookShelf