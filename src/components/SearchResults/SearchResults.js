import SearchBar from "../SearchBar/SearchBar";
import Tracklist from "../Tracklistz/Tracklist";
import "./SearchResults.css";

function SearchResults(props) {
  return (
    <div className="SearchResults">
      <SearchBar
        onSearchTerm={props.onSearchTerm}
        searchTerm={props.searchTerm}
        onSearch={props.onSearch}
      />
      <div className="tracks">
        <Tracklist tracks={props.results} onAdd={props.onAdd} />
      </div>
    </div>
  );
}

export default SearchResults;
