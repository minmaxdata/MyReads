import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'


//code example from slack used to build part of this code
class SearchBooks extends Component {
  state = {
    query: '',
    searchResults:[]
   }

  updateQuery = (query) => {  
    this.setState({ query: query.trim() })
  }

  assignShelf = (items, shelvedBooks) => {
    items.map(book => {
      const match = shelvedBooks.filter( b => book.id === b.id)
      if (match.length > 0){
        book.shelf = match[0].shelf
       } else {
        book.shelf = 'none'
      }
      return match
    })
    return items
  }

  searchBook = (query) => {
    this.updateQuery(query);
    if (query) {
      BooksAPI.search(query).then((books) => {
        if (!books.error) {
           this.setState({
            searchResults: this.assignShelf(books, this.props.assignedBooks)
          })
        } else {
          this.setState({searchResults: []});
        }
      })
    } else {
      this.setState({searchResults: []});
    }
  }

render () {

  	return (
		<div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              onChange={(event) => this.searchBook(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.searchResults.map(book => (
              <Book
                book={book}
                key={book.id}
                shelf={book.shelf}
                onChangeShelf={this.props.assignShelf}
              />
             ))}

          </ol>
        </div>
      </div>
		)
	
	}
}

export default SearchBooks