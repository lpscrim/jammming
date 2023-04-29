
function TrackList(props) {

    return (
        <div className="Tracklist">
            {props.results.map((result,i) => (
                <Track id={result.id} key={result.i} artist={result.artist} name={result.name} album={result.album} />
            ))}
        </div>
    );
}

export default TrackList;