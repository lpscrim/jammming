import PlaylistListItem from "../PlaylistListItem/PlaylistListItem";
import "./OthersList.css";
export default function OthersList(props) {
  function handleGetPlaylists() {
    props.onGetPlaylists();
  }

  return (
    <div className="OthersList">
      <div className="List">
        <h2 className="title">{props.username}'s playlists</h2>
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
