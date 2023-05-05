
function Playlist(props) {

    function handleNameChange(event) {
        props.onNameChange(event.target.value);
    };

    return (
        <div className="Playlist">
            <input defaultValue={props.name} onChange={handleNameChange} />
            <TrackList 
                tracks={props.tracks}
                onRemove={props.onRemove}
            />
        </div>
    );
};

export default Playlist;