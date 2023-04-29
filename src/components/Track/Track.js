
function Track(props) {
    
    return (
        <div id={props.id} className="Track">
            <div className="Track-information">
                <h3>{props.name}</h3>
                <p> {props.artist} |  {props.album} </p>
            </div>
        </div>
    );
}

export default Track;