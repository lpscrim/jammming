import Tracklist from '../Tracklist/Tracklist';

function SearchResults(props) {

    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <Tracklist 
                tracks={props.results}
                onAdd={props.onAdd} 
            />
        </div>
    );
}

export default SearchResults; 