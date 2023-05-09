import React, { useState } from 'react';

//import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
//import spotifySearch from '...';


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
  let spotifySearchResults = spotifySearch(term);
  setResults(spotifySearchResults);
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
setPlaylistTracks([
  { "id":1,
    "name":'',
    "uri":'1235',
    "artist":'',
    "album":''
    },
    {
    "id":2,
    "name":'',
    "uri":'1234',
    "artist":'',
    "album":''
    }
  ]);

  const savedUri = playlistTracks.map(playlistTrack => playlistTrack.uri);
  //Spotify.savePlaylist(setplaylistName, savedList);
  setResults([]);
  setPlaylistName('My Playlist');
  console.log(savedUri);
}


  return (
    
    <div className="App">
      <button onClick={onSave}>clickme</button>
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
