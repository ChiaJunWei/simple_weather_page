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
  // const [searchTerm, setSearchTerm] = useState("");
  // const [isError, setIsError] = useState(false);
  // const dispatch = useDispatch<AppDispatch>();

  // const {
  //   data: locationData,
  //   isLoading,
  //   error,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["searchTerm", searchTerm],
  //   queryFn: () => getWeatherApi(searchTerm),
  //   enabled: false,
  //   retry: false,
  // });
  // const {
  //   data: locationData,
  //   isLoading,
  //   error,
  //   refetch,
  // } = useWeatherQuery(searchTerm);

  // const handleSearch = async () => {
  //   if (searchTerm.trim() !== "") {
  //     try {
  //       const data = await getWeatherApi(searchTerm);
  //       console.log(data);
  //       addSuccesfulSearchToHistory();
  //       setSearchTerm("");
  //     } catch (error) {
  //       setIsError(true);
  //     }
  //   }
  // };

  // const addSuccesfulSearchToHistory = () => {
  //   const newItem: HistoryItem = {
  //     id: Date.now().toString(),
  //     searchedCountry: searchTerm,
  //     searchedDate: new Date().toISOString(),
  //   };
  //   dispatch(addSearchHistory(newItem));
  // };

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
      {isError && <div>error...</div>}

      <div className="search-bar-wrapper">
        <input
          className="search-bar"
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(formatInputToOnlyAlphabets(e.target.value));
            setIsError(false);
          }}
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
