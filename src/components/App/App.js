import React, { useState } from "react";
import "./App.css";

import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import PlaylistList from "../PlaylistList/PlaylistList";
import {
  getUsername,
  spotifySearch,
  savePlaylist,
  getUserPlaylists,
  getPlaylistTracks,
  getOtherPlaylists,
} from "../../Utility/Spotify/Spotify";
import OthersList from "../OthersList/OthersList";

function App() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [UserPlaylists, setUserPlaylists] = useState([]);
  const [otherPlaylists, setOtherPlaylists] = useState([]);
  const [username, setUsername] = useState("User");
  const [otherUser, setOtherUser] = useState("Random");

  async function onSelectPlaylist(id, name) {
    const tracks = await getPlaylistTracks(id);
    console.log("tracks= ", tracks);
    setPlaylistTracks(tracks);
    setPlaylistName(name);
  }

  async function onGetPlaylists() {
    const lists = await getUserPlaylists();
    setUsername(await getUsername());
    setUserPlaylists(lists);
  }

  async function onGetOtherPlaylists() {
    const lists = await getOtherPlaylists(otherUser);
    setOtherPlaylists(lists);
  }

  function onSearchTerm(term) {
    setSearchTerm(term);
  }

  function onNameChange(name) {
    setPlaylistName(name);
  }

  function otherNameChange(name) {
    setOtherUser(name);
  }

  function onSearch(term) {
    spotifySearch(term).then(setResults);
  }

  function onAdd(track) {
    if (
      !playlistTracks.find((playlistTrack) => playlistTrack.id === track.id)
    ) {
      setPlaylistTracks((playlistTracks) => [...playlistTracks, track]);
    }
  }

  function onRemove(track) {
    setPlaylistTracks(
      playlistTracks.filter((playlistTrack) => playlistTrack.id !== track.id)
    );
  }

  function onSave() {
    let savedList = playlistTracks.map((playlistTrack) => playlistTrack.uri);
    savePlaylist(playlistName, savedList);
    setResults([]);
    setPlaylistName("My Playlist");
  }

  function removeAllTracks() {
    setPlaylistTracks([]);
  }

  return (
    <div className="App">
      <h1>SPOTIFY PLAYLIST STEALER</h1>
      <div className="App-body">
        <div className="App-list">
          <SearchResults
            results={results}
            onAdd={onAdd}
            onSearchTerm={onSearchTerm}
            searchTerm={searchTerm}
            onSearch={onSearch}
          />
          <Playlist
            onNameChange={onNameChange}
            name={playlistName}
            tracks={playlistTracks}
            onRemove={onRemove}
            onSave={onSave}
            removeAllTracks={removeAllTracks}
          />
        </div>
        <div className="Bottom">
          <PlaylistList
            playlists={UserPlaylists}
            onGetPlaylists={onGetPlaylists}
            onSelectPlaylist={onSelectPlaylist}
            username={username}
          />
          <OthersList
            playlists={otherPlaylists}
            onGetPlaylists={onGetOtherPlaylists}
            onSelectPlaylist={onSelectPlaylist}
            username={otherUser}
            onNameChange={otherNameChange}
            name={otherUser}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
