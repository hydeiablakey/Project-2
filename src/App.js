import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import './App.css';

const API_KEY = 'UidqL9grHHxhpKkNEj34UYzWGlROX85q';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      searchQuery: "",
      limit: 25
    }
  }

  _handleRequest = ( query, newQuery ) => {
    axios.get(`https://api.giphy.com/v1/gifs/search?q=${ query }&api_key=${ API_KEY }&fmt=json&limit=${ this.state.limit }`)
      .then( ( res ) => {
	if (newQuery) {
	  this.setState({
	    results: res.data.data
	  });
	} else {
	  this.setState({
	    results: this.state.results.concat(res.data.data)
	  })
	}
      })
  }

  _handleSearch = ( event ) => {
    event.preventDefault();
    const searchQuery = event.target.getElementsByTagName('input')[0].value;
    this._handleRequest( searchQuery, searchQuery !== this.state.searchQuery );
    this.setState({
      searchQuery: searchQuery
    });
  }



  render() {
    return (
	<div className="containerApp">
	<SearchBar handleSearch={ this._handleSearch } handleState={ this.state.searchQuery }  />
	<SearchResults results={ this.state.results } query={this.state.searchQuery} />
	</div>
    )
  }
}
