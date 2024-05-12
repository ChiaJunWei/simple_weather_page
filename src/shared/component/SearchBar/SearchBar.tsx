// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../../app/store";
// import { HistoryItem } from "../../typings";
// import { addSearchHistory } from "../../../features/searchHistoryTable/searchHistorySlice";
import "./SearchBar.css";
import searchIcon from "../../assets/icon/search-icon.png";
import { formatInputToOnlyAlphabets } from "../../../utils/inputUtils";
// import { getWeatherApi } from "../../../utils/api/weatherApi";
// import { useQuery } from "@tanstack/react-query";
// import useWeatherQuery from "../../../utils/hooks/useWeatherQuery";
// import { useQuery } from "@tanstack/react-query";
// import { getWeatherApi } from "../../../utils/api/weatherApi";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  isError: boolean;
  setIsError: (isError: boolean) => void;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  isError,
  setIsError,
  handleSearch,
}) => {
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
    <div className="search-bar-wrapper-container">
      <div className="search-bar-wrapper">
        <div className="search-bar-container">
          <input
            className="search-bar"
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(formatInputToOnlyAlphabets(e.target.value));
              setIsError(false);
            }}
            style={isError ? { outline: "1px solid red" } : {}}
            placeholder="Search"
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="search-button" onClick={handleSearch}>
          <img className="search-icon-img" src={searchIcon} />
        </div>
      </div>
      {isError && (
        <div className="error-message">Error: City/Country not found</div>
      )}
    </div>
  );
};
export default SearchBar;
