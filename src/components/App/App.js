import React, { useState } from 'react';
import './App.css';
import SearchBar from '../Searchbar/SearchBar';
import SearchResults from '../Searchresults/SearchResults';
import Playlist from '../Playlist/Playlist';
import spotifySearch from '...'

const [results, setResults] = useState(0);

const [searchTerm, setSearchTerm] = useState(0);

const [playlistName, setPlaylistName] = useState(0);

const playlistTracks = ...

function onSearchTerm(term){
  setSearchTerm(term);
}

function onNameChange(name){
  setPlaylistName(name)
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
      <Playlist onNameChange={onNameChange} name={playlistName} tracks={playlistTracks} />
      </div>
      
    </div>
  );
}

export default App;
