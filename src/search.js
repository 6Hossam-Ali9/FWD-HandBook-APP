import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import './App.css'
import ShowBooks from './book'


class Search extends React.Component{
    state={
        books:[],
        searchText:''
    }
    searchHandler = (msg) => {
        this.setState((curr) => ({
            searchText: msg
        }))
        if(msg.trim() !== ''){  // handler for the api errors
            this.searchResults(msg);
        } else {
            this.setState((curr) => ({
                books:[]
            }))
        }
    }
    searchResults = (msg) =>{
        BooksAPI.search(msg)
        .then(books => {
            if(!books['error']) {  // handler for the api errors
                //console.log(books);
                //console.log(this.state.myLib);
                books.forEach((book) => {
                    book.shelf = 'none';
                    this.props.myLib.forEach((mybook) => {
                        // console.log(book.title, mybook.title);
                        // console.log(book.id, mybook.id);
                        if(book.id === mybook.id){  //connecting between my library and the search to fix the selected shelf
                            book.shelf = mybook.shelf;
                        }
                    })
                    // console.log(book.shelf);
                })
                this.setState((curr) => ({
                    books
                }))
            }else{
                this.setState((curr) => ({
                    books:[]
                }))
            }
        }).catch(err => console.log(err))
    }
    updateShelf = (shelf, book) => {  //obviously, updating the shelf and taking the book to my library
        // console.log(book);
        // console.log(shelf);
        BooksAPI.update(book, shelf)
        .then(() => this.props.onUpdate())//used it here to link between the main and the search pages to have the same Library
        //don't know if it is a problem or not but the page have to rerender after updating
    }
    render(){
        const {searchText, books} = this.state;
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" value={searchText} onChange = {(event) => this.searchHandler(event.target.value)}/>
              </div>
            </div>
            <div className="search-books-results">
              <ShowBooks books = {books} update = {this.updateShelf} />
            </div>
          </div>
        )
    }
}

export default Search
