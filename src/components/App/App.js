import React, { useState } from 'react';
//import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
//import spotifySearch from '...';

const [results, setResults] = useState(0);

const [searchTerm, setSearchTerm] = useState(0);

const [playlistName, setPlaylistName] = useState(0);

const [playlistTracks, setPlaylistTracks] = useState(0);

function onSearchTerm(term){
  setSearchTerm(term);
}

function onNameChange(name){
  setPlaylistName(name)
}

function onSearch(term) {
  setResults(spotifySearch(term));
}

function onAdd(track) {
  if (!playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
    setPlaylistTracks(prevList => prevList.push(track));
  }
}

function onRemove(track) {
  setPlaylistTracks(playlistTracks.filter(playlistTrack => playlistTrack.id != track.id));
}


function App() {
  return (
    <div className="App">
      <header className="App-header">JAMMMING</header>
      <div>
      <SearchBar 
        onSearchTerm={onSearchTerm} 
        searchTerm={searchTerm} 
        onSearch={onSearch} 
      />
      <SearchResults 
        results={results}
        onAdd={onAdd}  
      />
      <Playlist 
        onNameChange={onNameChange} 
        name={playlistName} 
        tracks={playlistTracks}
        onRemove={onRemove}
      />
      </div>
      
    </div>
  );
}

export default App;
