import Track from "../Track/Track";

function Tracklist(props) {

    return (
        <div className="Tracklist">
            {props.tracks.map((track) => {
                return (
                    <Track 
                        id={track.id} 
                        key={track.id} 
                        onRemove={props.onRemove}
                        onAdd={props.onAdd}
                        track={track}
                    />
                );
            })};
        </div>
    );
}

export default Tracklist;