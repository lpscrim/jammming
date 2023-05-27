import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './Track.css';

function Track(props) {
    
    function renderButton(){
        if (props.onAdd) {
            return <button className='Track-button' onClick={handleAddTrack}>+</button>;
          } else {
            return <button className='Track-button' onClick={handleRemoveTrack}>-</button>;
          }
    }

    function handleAddTrack() {
        props.onAdd(props.track);
    }

    function handleRemoveTrack() {
        props.onRemove(props.track);
    }

    return (
        <div id={props.track.id} className="Track">
            <div className="Track-info">
                <h3>{props.track.name}</h3>
                <p> {props.track.artist} |  {props.track.album} </p>
            </div>
            <AudioPlayer className="Player" src={props.track.preview} layout="horizontal" customAdditionalControls={[]} customVolumeControls={[]} showJumpControls={false} />
            {renderButton()}
        </div>
    );
}

export default Track;