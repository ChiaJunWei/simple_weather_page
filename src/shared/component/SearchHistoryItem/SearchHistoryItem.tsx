import React from "react";
import { WeatherWidgetData } from "../../typings";
import "./SearchHistoryItem.css";
import searchIcon from "../../assets/icon/search-icon.png";
import deleteIcon from "../../assets/icon/delete-icon.png";

interface SearchHistoryItemProps {
  item: WeatherWidgetData;
  index: number;
  handleDelete: (index: number) => void;
  handleSelect: (item: WeatherWidgetData) => void;
}

const SearchHistoryItem: React.FC<SearchHistoryItemProps> = ({
  item,
  index,
  handleDelete,
  handleSelect,
}) => {
  return (
    <div className="search-history-item">
      <div className="country-name">
        {item.city},{item.country}
      </div>
      <div className="date-action-container">
        <div className="date">{item.time}</div>
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

export default SearchHistoryItem;
