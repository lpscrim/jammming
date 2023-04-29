import React from 'react';
import './App.css';

function setSearchTerm() {

}

function searchTerm() {
  
}

function onSearch() {
  
}

const results = JSON.parse(...);



function App() {
  return (
    <div className="App">
      <header className="App-header"> </header>
      <div>
      <SearchBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} onSearch={onSearch} />
      <SearchResults results={results} />
      <Playlist {...}/>
      </div>
      
    </div>
  );
}

export default App;
