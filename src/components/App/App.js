import React, { useState } from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import PlaylistList from '../PlaylistList/PlaylistList';
import { getUsername, spotifySearch, savePlaylist, getUserPlaylists, getPlaylistTracks } from '../../Utility/Spotify/Spotify';

function App() {

const [results, setResults] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [playlistName, setPlaylistName] = useState('New Playlist');
const [playlistTracks, setPlaylistTracks] = useState([]);
const [playlists, setPlaylists] = useState([]);
const [username, setUsername] = useState('User');

async function onSelectPlaylist(id, name) {
  const tracks = await getPlaylistTracks(id)
  console.log("tracks= ", tracks);
  setPlaylistTracks(tracks);
  setPlaylistName(name);
}

async function onGetPlaylists(){
  const lists = await getUserPlaylists();
  setUsername(await getUsername()) ;
  setPlaylists(lists);
}

function onSearchTerm(term){
  setSearchTerm(term);
}

function onNameChange(name){
  setPlaylistName(name);
}

function onSearch(term) {
  spotifySearch(term).then(setResults);;
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
}


  return (
    
    <div className="App">
      <h1>
        SPOTIFY PLAYLIST STEALER 
      </h1>
      <div className="App-body">
        <SearchBar 
          onSearchTerm={onSearchTerm} 
          searchTerm={searchTerm} 
          onSearch={onSearch} 
        />
        <div className="App-list">
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
        <div className="Platlist-list">
          <PlaylistList
            playlists={playlists}
            onGetPlaylists={onGetPlaylists}
            onSelectPlaylist={onSelectPlaylist}
            username={username}
          />
        </div>  
      </div>
    </div>
  );
}

export default App;
