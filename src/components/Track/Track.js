
function Track(props) {
    
    function renderButton(props){
        if (props.onAdd) {
            return <button className='Track-button' onClick={handleAddTrack()}>+</button>;
          } else {
            return <button className='Track-button' onClick={handleRemoveTrack()}>-</button>;
          }
    }

    function handleAddTrack(event) {
        props.onAdd(event.target);
    }

    function handleRemoveTrack(event) {
        props.onRemove(event.target);
    }

    return (
        <div id={props.id} className="Track">
            <div className="Track-information">
                <h3>{props.name}</h3>
                <p> {props.artist} |  {props.album} </p>
            </div>
            {renderButton()}
        </div>
    );
}

export default Track;