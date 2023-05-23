import Tracklist from '../Tracklist/Tracklist';

import './Playlist.css';

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
            <button className="Playlist-save" onClick={props.onSave}>
          SAVE TO SPOTIFY
            </button>
        </div>
    );
};

export default Playlist;