import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBookShelf from './ListBookShelf'
import SearchBooks from './SearchBooks'


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
    onChangeShelf = (item, newShelf) => {
        BooksAPI.update(item, newShelf).then(result => {
           this.setState(previousState => {
             const newState = previousState; //output is an array
             // console.log('this is the new state' + JSON.stringify(newState));
             // filter the newState array and get the id of the book to move
             const chosenBookToMove = newState.books.filter(book => book.id === item.id);
             // console.log('chosen book' + JSON.stringify(chosenBookToMove));
             //grab the shelf property, this is the new shelf where the book will go
             chosenBookToMove[0].shelf = newShelf;
             return ({ books: newState.books })
           });
    });
    }

      // Use the BooksAPI getAll method to get all the books on load

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        });
    };

    render() {
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
                                books={this.state.books}
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