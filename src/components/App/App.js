import React, { useState } from 'react';
//import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
//import spotifySearch from '...';


function App() {

const [results, setResults] = useState([]);

const [searchTerm, setSearchTerm] = useState('');

const [playlistName, setPlaylistName] = useState('0');

const [playlistTracks, setPlaylistTracks] = useState([]);

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
