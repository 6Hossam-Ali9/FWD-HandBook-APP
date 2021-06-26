import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import './App.css'
import ShowBooks from './book'


class myShelf extends React.Component{
    state={
        books:[],
        currReading:[],
        wantToRead:[],
        doneRead:[]
    }

    updateShelf = (shelf, book) => {
      BooksAPI.update(book, shelf)
      .then(()=>BooksAPI.getAll())
      .then((books) => this.updateBooks(books));
  }

    updateBooks = (books) => {
        let currBk = [];
        let WTR = [];
        let done = [];
        let allbooks=[];
        if(Array.isArray(books)){
            currBk = books.filter((book) => book.shelf==='currentlyReading');
            WTR = books.filter((book) => book.shelf==='wantToRead');
            done = books.filter((book) => book.shelf==='read');
            allbooks = [...currBk, ...WTR, ...done]
        }
        this.setState((curr) => ({
            currReading: currBk,
            wantToRead: WTR,
            doneRead: done,
            books: allbooks  //I needed this so I can search in all the books at once and not to search in every shelf alone
        }))
    }
    componentDidMount(){
        BooksAPI.getAll()
        .then((books) => {
            //console.log(books);
            this.updateBooks(books);
        })
    }
    render(){
        const {currReading , wantToRead, doneRead} = this.state;
        
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <ShowBooks books={currReading} update = {this.updateShelf}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <ShowBooks books={wantToRead} update = {this.updateShelf}/>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <ShowBooks books={doneRead} update = {this.updateShelf}/>
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