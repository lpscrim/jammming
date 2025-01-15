import PlaylistListItem from "../PlaylistListItem/PlaylistListItem";
import "./PlaylistList.css";
function PlaylistList(props){

    function handleGetPlaylists() {
        props.onGetPlaylists();
    };

    return (
        <div className="Playlist-list">
            <div className="Head">
                <h2>{props.username}'s playlists</h2>
            </div>
            <div className="List">
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
            <button 
                className="Get-playlists" 
                onClick={handleGetPlaylists}>
                Get {props.username}'s playlists
            </button>
        </div>
    )
}

export default PlaylistList;