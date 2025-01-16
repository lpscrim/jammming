import PlaylistListItem from "../PlaylistListItem/PlaylistListItem";
import "./OthersList.css";
export default function OthersList(props) {
  
  function handleNameChange(event) {
    props.onNameChange(event.target.value);
  }
  function handleGetPlaylists() {
    props.onGetPlaylists(props.name);
  }

  return (
    <div className="Others-list">
      <div className="List">
        <input defaultValue={props.name} onChange={handleNameChange} />
        {props.playlists.map((playlist) => {
          return (
            <PlaylistListItem
              key={playlist.id}
              id={playlist.id}
              name={playlist.name}
              onSelectPlaylist={props.onSelectPlaylist}
            />
          );
        })}
      </div>
      <button className="Get-playlists" onClick={handleGetPlaylists}>
        Steal playlists
      </button>
    </div>
  );
}
