import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import './App.css'
import ShowBooks from './book'


class myShelf extends React.Component{
  state ={
    books: this.props.myLib
  }

    updateShelf = (shelf, book) => {
      BooksAPI.update(book, shelf)
      .then(()=>BooksAPI.getAll())
      .then((books) => this.updateBooks(books))
      .then(() => this.props.onUpdate());//used it here to link between the main and the search pages to have the same Library
  }

    updateBooks = (books) => {
        this.setState((curr) => ({
            books
        }))
    }
    render(){
      const {books} = this.state;
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <ShowBooks books={books.filter((book) => book.shelf==='currentlyReading')} update = {this.updateShelf}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <ShowBooks books={books.filter((book) => book.shelf==='wantToRead')} update = {this.updateShelf}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <ShowBooks books={books.filter((book) => book.shelf==='read')} update = {this.updateShelf}/>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to ="/search">Add a book</Link> 
            </div>
          </div>
        )
    }
}

export default myShelf