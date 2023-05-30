
function PlaylistList(props){

    function handleGetPlaylists() {
        props.onGetPlaylists();
    };

    return (
        <div className="Playlist-list">
            <div className="List">
                {props.playlists.map((playlist) => {
                    return (
                        <PlaylistItem 
                            id={playlist.id} 
                            name={Playlist.name}
                        />
                    );
                })};       
            </div>
            <button className="Get-playlists" onClick={handleGetPlaylists}
            />
        </div>
    )
}