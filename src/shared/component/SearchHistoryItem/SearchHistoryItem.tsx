import React from "react";
import { HistoryItem } from "../../typings";
import "./SearchHistoryItem.css";
import { formatIsoDate } from "../../../utils/dateUtils";
import searchIcon from "../../assets/icon/search-icon.png";
import deleteIcon from "../../assets/icon/delete-icon.png";

interface SearchHistoryItemProps {
  item: HistoryItem;
  index: number;
  handleDelete: (index: number) => void;
}

const SearchHistoryItem: React.FC<SearchHistoryItemProps> = ({
  item,
  index,
  handleDelete,
}) => {
  return (
    <div className="search-history-item">
      <div className="country-name">{item.searchedCountry}</div>
      <div className="date-action-container">
        <div className="date">{formatIsoDate(item.searchedDate)}</div>
        <img className="icon" src={searchIcon} alt="search-icon" />
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
