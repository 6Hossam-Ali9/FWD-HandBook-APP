import React from 'react'
import './App.css'


const ShowBooks = (props) =>{
    return(
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.books.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks?book.imageLinks.thumbnail:''})` }}></div>
                                <div className="book-shelf-changer">
                                    <select defaultValue={book.shelf} onChange = {(event) => props.update(event.target.value, book)}>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading"> Currently Reading </option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default ShowBooks