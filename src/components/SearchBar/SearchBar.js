
function SearchBar(props) {
    
    const placeholder = props.searchTerm ? props.searchTerm : "Enter A Song, Album, or Artist";

    function termChangeHandler(event) {
        const newSearchTerm = event.target.value;
        props.setSearchTerm(newSearchTerm);    
    };
    function searchHandler() {
        props.onSearch(props.searchTerm);
    };
    
    return (
        <div className="SearchBar">
            <input type="text" onChange={termChangeHandler} placeholder={placeholder} id="SearchBar"></input>
            <button onClick={searchHandler} className="SearchButton">SEARCH</button>
        </div>
    );
}

export default SearchBar;

