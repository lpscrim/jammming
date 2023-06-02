import PlaylistListItem from "../PlaylistListItem/PlaylistListItem";

function PlaylistList(props){

    function handleGetPlaylists() {
        props.onGetPlaylists();
    };

    return (
        <div className="Playlist-list">
            <div className="Head">
                <h2>User Playlists</h2>
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
                })};       
            </div>
            <button 
                className="Get-playlists" 
                onClick={handleGetPlaylists}>
                Get User Playlists
            </button>
        </div>
    )
}

export default PlaylistList;