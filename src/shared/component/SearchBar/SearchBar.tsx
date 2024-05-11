import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { HistoryItem } from "../../typings";
import { addSearchHistory } from "../../../features/searchHistoryTable/searchHistorySlice";
import "./SearchBar.css";
import searchIcon from "../../assets/icon/search-icon.png";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        searchedCountry: searchTerm,
        searchedDate: new Date().toISOString(),
      };
      dispatch(addSearchHistory(newItem));
      setSearchTerm("");
    }
  };
  // function to handle Enter press event on search bar
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      (event.currentTarget as HTMLInputElement).value.trim() !== ""
    ) {
      handleSearch();
    }
  };
  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <input
          className="search-bar"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="search-button" onClick={handleSearch}>
        <img className="search-icon-img" src={searchIcon} />
      </div>
    </div>
  );
};
export default SearchBar;
