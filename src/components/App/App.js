import React, { useState } from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import PlaylistList from '../PlaylistList/PlaylistList';
import { spotifySearch, savePlaylist, getUserPlaylists, getPlaylistTracks } from '../../Utility/Spotify/Spotify';

function App() {

const [results, setResults] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [playlistName, setPlaylistName] = useState('My Playlist');
const [playlistTracks, setPlaylistTracks] = useState([]);
const [playlists, setPlaylists] = useState([]);

async function onSelectPlaylist(id, name) {
  console.log(name)
  console.log(id)
  const tracks = await getPlaylistTracks(id)
  console.log(tracks);
  setPlaylistTracks(tracks);
  setPlaylistName(name);
}

async function onGetPlaylists(){
  const lists = await getUserPlaylists();
  setPlaylists(lists);
  console.log("playlists= " + playlists);
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
        JAMMMING
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
          />
        </div>  
      </div>
    </div>
  );
}

export default App;
