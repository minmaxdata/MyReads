import React from 'react'

class Book extends React.Component {

  	handleChange(event) {
       	this.props.book.shelf = event.target.value
    	this.props.onChangeShelf(this.props.book, event.target.value);
	 }

   render () {
  	const book = this.props.book
	const imageNotFound = '../icons/image-not-found.gif'

    return (
	 	<li key={ book.id }>
		    <div className="book">
		    <div className="book-top">
		    <div className="book-cover" style={ { width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : imageNotFound})` } }> </div> 
		    <div className="book-shelf-changer">
		      <select onChange={e => this.handleChange(e)}
		         value={book.shelf}>
		        <option value="move" disabled> Move to... </option> 

		        <option value="currentlyReading"> Currently Reading </option> 
		        <option value="wantToRead"> Want to Read </option>
		        <option value="read"> Read </option> 
		        <option value="none"> None </option> 
		      </select> 
		    </div> 
		    </div> 
		    <div className="book-title"> { book.title } </div> 
		    <div className="book-authors">  
			    {(book.authors) ? 
			    	<span>
	    				{book.authors.map((author) => (
	        				<div key={author}>{author}</div>
	    				))}
					</span>
					: <span> Author not found </span>
				}
		    </div> 
		    </div>
	  	</li>

	)
   } 
 }



export default Book