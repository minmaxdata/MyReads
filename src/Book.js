import React from 'react'


class Book extends React.Component {




   render () {
   	
  	const book = this.props.book
  	const shelfFunction = this.props.onChangeShelf

  	function changeShelf (event) {
   		shelfFunction(book, event.target.value)
  	}

    return (
	 	<li key={ book.id }>
		    <div className="book">
		    <div className="book-top">
		    <div className="book-cover" style={ { width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` } }> </div> 
		    <div className="book-shelf-changer">
		      <select onChange={changeShelf}
		         value={book.shelf}>}
		        <option value="none" disabled> Move to... </option> 

		        <option value="currentlyReading"> Currently Reading </option> 
		        <option value="wantToRead"> Want to Read </option>
		        <option value="read"> Read </option> 
		        <option value="none"> None </option> 
		      </select> 
		    </div> 
		    </div> 
		    <div className="book-title"> { book.title } </div> 
		    <div className="book-authors">  { book.authors } </div> 
		    </div> 
	  	</li>

    	)
   } 
 }



export default Book