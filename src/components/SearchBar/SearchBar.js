import './SearchBar.css';

function SearchBar(props) {
    
    const placeholder = props.searchTerm ? props.searchTerm : "Enter A Song, Album, or Artist";

    function termChangeHandler(e) {
        const newSearchTerm = e.target.value;
        props.onSearchTerm(newSearchTerm);    
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
};

export default SearchBar;

