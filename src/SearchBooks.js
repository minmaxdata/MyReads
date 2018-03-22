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

  assignShelf = (items) => {
      items.map(book => {
        this.props.assignedBooks.filter( b => {
          if (b.id === book.id) {
            console.log(b.shelf)
          }
        })
      })
    }
  searchBook = (query) => {
    this.updateQuery(query);
    if (query) {
      BooksAPI.search(query).then((books) => {
        if (!books.error) {
          this.assignShelf(books)
         
           this.setState({
            searchResults: books
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
                shelf={book.shelf ? book.shelf : 'none'}
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