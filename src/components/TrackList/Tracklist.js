
function TrackList(props) {

    return (
        <div className="Tracklist">
            {props.tracks.map((track,i) => (
                <Track id={track.id} key={track.i} artist={track.artist} name={track.name} album={track.album} />
            ))}
        </div>
    );
}

export default TrackList;