import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBookShelf from './ListBookShelf'
import SearchBooks from './SearchBooks'
import './App.css'


class BooksApp extends React.Component {
    state = {

        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        books:[]
        
    }

    // code from slack used in this method
    onChangeShelf = (book, value) => {
        BooksAPI.update(book, value).then(() => {
            book.shelf = value
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat(book)
            }))
        })
    }

      // Use the BooksAPI getAll method to get all the books on load

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        });
    };

    render() {
        const {books} = this.state

        return ( 
            <div className="app" > 
            <Route path="/search" render={() => (
                <SearchBooks / >
             )}/>

            <Route exact path="/" render={() => (

                <div className="list-books">
                    <div className="list-books-title">
                        <h1> MyReads </h1> 
                    </div> 
                    <div className="list-books-content">
                        <div> 
                        {["Currently Reading", "Want to Read", "Read"].map(shelf => 
                            <ListBookShelf 
                                shelf={shelf} 
                                key={shelf}
                                books={books}
                                onChangeShelf={this.onChangeShelf}
                            /> 

                        )}
                        
                        </div> 
                    </div> 
                    <div className="open-search" >
                        <Link to="/search">Add a book</Link>
                    </div> 
                </div>
                )
            } />
            </div>
        )
    }
}

export default BooksApp