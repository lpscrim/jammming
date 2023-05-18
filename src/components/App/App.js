import React, { useState } from 'react';

//import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { spotifySearch, savePlaylist } from '../../Utility/Spotify/Spotify';

function App() {

const [results, setResults] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [playlistName, setPlaylistName] = useState('My Playlist');
const [playlistTracks, setPlaylistTracks] = useState([]);

function onSearchTerm(term){
  setSearchTerm(term);
}

function onNameChange(name){
  setPlaylistName(name)
}

function onSearch(term) {
  spotifySearch(term).then(setResults);
  console.log(results);
}

function onAdd(track) {
  if (!playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
    setPlaylistTracks(playlistTracks => [...playlistTracks, track]);
  };
}

function onRemove(track) {
  setPlaylistTracks(playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id));
}

function onSave() {
  let savedList = playlistTracks.map(playlistTrack => playlistTrack.uri);
  savePlaylist(playlistName, savedList);
  setResults([]);
  setPlaylistName('My Playlist');
  console.log(savedList);
}


  return (
    
    <div className="App">
      <header className="App-header">
        JAMMMING
      </header>
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
        onSave={onSave}
      />
      </div>
    </div>
  );
}

export default App;
