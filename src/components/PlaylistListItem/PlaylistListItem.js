import "./PlaylistListItem.css";
function PlaylistListItem(props){
    
    function handleSelectPlaylist() {
        props.onSelectPlaylist(props.id, props.name);
    }

    return (
        <div className="Playlist-list-item" onClick={handleSelectPlaylist}>
            <p>{props.name}</p>
        </div>
    )
}

export default PlaylistListItem;