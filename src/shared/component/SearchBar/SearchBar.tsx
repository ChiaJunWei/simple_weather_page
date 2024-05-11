import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { HistoryItem } from "../../typings";
import { addSearchHistory } from "../../../features/searchHistoryTable/searchHistorySlice";

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

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
      <button onClick={handleSearch}>Search</button>
    </>
  );
};
export default SearchBar;
