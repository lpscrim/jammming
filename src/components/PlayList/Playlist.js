import Tracklist from '../Tracklist/Tracklist';

import './Playlist.css';

function Playlist(props) {

    function handleNameChange(event) {
        props.onNameChange(event.target.value);
    };

    return (
        <div className="Playlist">
        <div className='Playlist-information'>
            <input defaultValue={props.name} onChange={handleNameChange} />
            <button className="clear" onClick={props.onClear}>
                CLEAR
            </button>
            {props.tracks.length}
        </div>
            <div className="Playlist-tracks">
                <Tracklist 
                    tracks={props.tracks}
                    onRemove={props.onRemove}
                />
            </div>
            <button className="Playlist-save" onClick={props.onSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
};

export default Playlist;