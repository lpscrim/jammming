import Tracklist from '../Tracklist/Tracklist';

function Playlist(props) {

    function handleNameChange(event) {
        props.onNameChange(event.target.value);
    };

    return (
        <div className="Playlist">
            <input defaultValue={props.name} onChange={handleNameChange} />
            <Tracklist 
                tracks={props.tracks}
                onRemove={props.onRemove}
            />
        </div>
    );
};

export default Playlist;