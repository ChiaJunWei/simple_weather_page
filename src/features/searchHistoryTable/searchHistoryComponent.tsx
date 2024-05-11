import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  deleteAllSearchHistory,
  deleteSearchHistory,
} from "./searchHistorySlice";
import SearchHistoryItem from "../../shared/component/SearchHistoryItem/SearchHistoryItem";
import { HistoryItem } from "../../shared/typings";
import "./searchHistoryComponent.css";
import ConfirmModal from "../../shared/component/Modal/Modal";
import { useState } from "react";

const SearchHistoryComponent = () => {
  const searchHistory = useSelector(
    (state: RootState) => state.searchHistory.history,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const handleDelete = (item: HistoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const handleConfirmDelete = () => {
    if (selectedItem) {
      dispatch(deleteSearchHistory(selectedItem.id));
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="search-history-container">
        <div className="search-history-header">
          <div className="search-history-text">Search History</div>
          <button
            className="clear-all-button"
            onClick={() => dispatch(deleteAllSearchHistory())}
          >
            Clear All
          </button>
        </div>
        {searchHistory.length > 0 && (
          <div className="search-history-list">
            {searchHistory?.map((item, index) => (
              <SearchHistoryItem
                key={index}
                item={item}
                index={index}
                handleDelete={() => handleDelete(item)}
              />
            ))}
          </div>
        )}
      </div>
      {isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          message={`Are you sure you want to delete this ${selectedItem?.searchedCountry} search history?`}
        />
      )}
    </div>
  );
};

export default SearchHistoryComponent;
