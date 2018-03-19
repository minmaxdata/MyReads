import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {  
    this.setState({ query: query.trim() })
  }
  searchBook = (query) => {
    this.updateQuery(query);
    if (query) {
      BooksAPI.search(query).then((books) => {
        if (!books.error) {
           this.setState({
            books
          })
        } else {
          this.setState({books: []});
        }
      })
    } else {
      this.setState({books: []});
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
          {this.state.books.map(book => (
              <Book
                book={book}
                key={book.id}
                shelf={book.shelf}
                onChangeShelf={this.props.onChangeShelf}
              />
            ))}

          </ol>
        </div>
      </div>
		)
	
	}
}

export default SearchBooks