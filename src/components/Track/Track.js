
function Track(props) {
    
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p> {props.track.artist} |  {props.track.album} </p>
            </div>
        </div>
    );
}

export default Track;