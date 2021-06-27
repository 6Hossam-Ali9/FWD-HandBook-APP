import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import MyShelf from'./main'
import Search from './search'

class BooksApp extends React.Component {
  state ={
    myLib:[]
  }
  onUpdate = () => {   //I put this fuction outside the {componentDidMount} so, I can call it back to render again on every update
    BooksAPI.getAll()
    .then((books) => {
      this.setState((curr) => ({
        myLib: books
      }))
    })
  }
  componentDidMount(){
    this.onUpdate();
  }
  
  render() {
    const {myLib} = this.state;
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' component={() => (<MyShelf myLib = {myLib} onUpdate = {() => this.onUpdate()}/>)} />
          <Route exact path ='/search' component={() => (<Search  myLib = {myLib} onUpdate = {() => this.onUpdate()}/>)}/>
          <Route  render = {() => (<h1>Not Found!!</h1>)}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
