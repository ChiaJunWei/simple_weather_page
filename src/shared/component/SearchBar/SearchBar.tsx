import "./SearchBar.css";
import searchIcon from "../../assets/icon/search-icon.png";
// Import the input utility function to format input to only alphabets
import { formatInputToOnlyAlphabets } from "../../../utils/inputUtils";

interface SearchBarProps {
  searchTerm: string; // The current search term
  setSearchTerm: (searchTerm: string) => void; // Function to update the search term
  isError: boolean; // Flag indicating if there's a search error (true/false)
  setIsError: (isError: boolean) => void; // Function to update the error flag (true/false)
  handleSearch: () => void; // Function to handle the search action
  isLoading: boolean; // Flag indicating if the search is in progress (true/false)
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  isError,
  setIsError,
  handleSearch,
  isLoading,
}) => {
  // Function to handle Enter press event on search bar
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
        <div
          className={`search-button ${isLoading ? "disabled" : ""}`}
          onClick={isLoading ? undefined : handleSearch}
        >
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
