
function Playlist(props) {

    function handleNameChange(e) {
        props.onNameChange(e.target.value);
    };

    return (
        <div className="Playlist">
            <input defaultValue={props.name} onChange={handleNameChange} />
            <TrackList tracks={props.tracks} />
        </div>
    );
};

export default Playlist;