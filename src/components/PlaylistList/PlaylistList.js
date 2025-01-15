import PlaylistListItem from "../PlaylistListItem/PlaylistListItem";
import "./PlaylistList.css";
function PlaylistList(props){

    function handleGetPlaylists() {
        props.onGetPlaylists();
    };

    return (
        <div className="Playlist-list">
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
            <button 
                className="Get-playlists" 
                onClick={handleGetPlaylists}>
                Get {props.username}'s playlists
            </button>
        </div>
    )
}

export default PlaylistList;