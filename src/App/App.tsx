import React from "react";
import SearchHistoryComponent from "../features/searchHistoryTable/searchHistoryComponent";
import "./App.css";
import SearchBar from "../shared/component/SearchBar/SearchBar";

function App() {
  return (
    <div className="page-container">
      <div className="component-wrapper">
        <h1>Today's Weather</h1>
        <SearchBar />
        <SearchHistoryComponent />
      </div>
    </div>
  );
}

export default App;
