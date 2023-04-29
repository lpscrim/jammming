
function SearchResults(props) {

    return (
        <div ClassName="SearchResults">
            <h2>Results</h2>
            <Tracklist results={props.results}/>
        </div>
    );
}

export default SearchResults;