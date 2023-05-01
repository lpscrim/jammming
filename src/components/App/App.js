import React, { useState } from 'react';
import './App.css';
import SearchBar from '../Searchbar/SearchBar';
import SearchResults from '../Searchresults/SearchResults';
import Playlist from '../Playlist/Playlist';
import spotifySearch from '...'

const [results, setResults] = useState(0);

const [searchTerm, setSearchTerm] = useState(0)

function onSearchTerm(term){
  setSearchTerm(term);
}

function onSearch(term) {
  setResults(spotifySearch(term));
}


function App() {
  return (
    <div className="App">
      <header className="App-header">JAMMMING</header>
      <div>
      <SearchBar onSearchTerm={onSearchTerm} searchTerm={searchTerm} onSearch={onSearch} />
      <SearchResults results={results} />
      <Playlist {...}/>
      </div>
      
    </div>
  );
}

export default App;
