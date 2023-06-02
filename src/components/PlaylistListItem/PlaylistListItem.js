function PlaylistListItem(props){
    
    function handleSelectPlaylist() {
        props.onSelectPlaylist(props.id, props.name);
    }

    return (
        <div className="Playlist-list-item" onClick={handleSelectPlaylist}>
            <h2>{props.name}</h2>
        </div>
    )
}

export default PlaylistListItem;