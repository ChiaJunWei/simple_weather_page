import React from "react";
import { WeatherWidgetData } from "../../typings";
import "./SearchHistoryItem.css";
import searchIcon from "../../assets/icon/search-icon.png";
import deleteIcon from "../../assets/icon/delete-icon.png";
import { formatUnixDate } from "../../../utils/dateUtils";

interface SearchHistoryItemProps {
  item: WeatherWidgetData; // The weather data item
  index: number; // The index of the item in the search history array
  handleDelete: (index: number) => void; // Function to delete an item from the search history
  handleSelect: (item: WeatherWidgetData) => void; // Function to select an item from the search history
}

const SearchHistoryItem: React.FC<SearchHistoryItemProps> = ({
  item,
  index,
  handleDelete,
  handleSelect,
}) => {
  return (
    <div className="search-history-item">
      <div className="country-timestamp-container">
        <div className="country-name">
          {item.city},{item.country}
        </div>
        <div className="date">{formatUnixDate(item.timestamp)}</div>
      </div>

      <div className="date-action-container">
        <img
          className="icon"
          src={searchIcon}
          alt="search-icon"
          onClick={() => handleSelect(item)}
        />
        <img
          className="icon"
          src={deleteIcon}
          alt="search-icon"
          onClick={() => handleDelete(index)}
        />
      </div>
    </div>
  );
};

export const SearchHistoryItemComponent = React.memo(SearchHistoryItem);
