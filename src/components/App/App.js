import React, { useState, useEffect } from "react";
import "./App.css";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import PlaylistList from "../PlaylistList/PlaylistList";
import Matrix from "../Matrix/Matrix";
import {
  logout,
  getUsername,
  spotifySearch,
  savePlaylist,
  getUserPlaylists,
  getPlaylistTracks,
  getOtherPlaylists,
  getAccessToken
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
  const [otherUser, setOtherUser] = useState("Target User");
  const [matrix, setMatrix] = useState(false);

  useEffect(() => {
    // Retrieve the access token when the component mounts
    getAccessToken();
  }, []);

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

  function onLogout() {
    logout();
  }

  function onMatrix() {
    setMatrix(!matrix);
  }

  return (
    <div className="App">
      <Matrix on={matrix}/>
      <div className="Main">
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
        <div className="logout">
          <button onClick={onLogout}>Logout</button>
        </div>
        
        <div className="Player">
          <iframe
            title="Spotify Player"
            src="https://open.spotify.com/embed/playlist/24sgmPIJ2sj1eXYUhtnktQ?utm_source=generator&theme=0"
            width="100%"
            height="100"
            frameBorder="0"
            allowfullscreen=""
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        <button className="matrix" onClick={onMatrix}>マトリックス</button>
      </div>
    </div>
  );
}

export default App;
