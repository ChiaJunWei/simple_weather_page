import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  deleteAllSearchHistory,
  deleteSearchHistory,
} from "./searchHistorySlice";
import SearchHistoryItem from "../../shared/component/SearchHistoryItem/SearchHistoryItem";
import { WeatherWidgetData } from "../../shared/typings";
import "./searchHistoryComponent.css";
import ConfirmModal from "../../shared/component/Modal/Modal";
import { useState } from "react";

interface SearchHistoryComponentProps {
  handleSelect: (item: WeatherWidgetData) => void;
}

const SearchHistoryComponent: React.FC<SearchHistoryComponentProps> = ({
  handleSelect,
}) => {
  const searchHistory = useSelector(
    (state: RootState) => state.searchHistory.history,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [modalState, setModalState] = useState<{
    type: string | null;
    selectedItem: WeatherWidgetData | null;
  }>({
    type: null,
    selectedItem: null,
  });

  const handleDelete = (item: WeatherWidgetData) => {
    setModalState({ type: "delete", selectedItem: item });
  };

  const handleClearAll = () => {
    setModalState({ type: "clearAll", selectedItem: null });
  };

  const handleConfirm = () => {
    if (modalState.type === "delete" && modalState.selectedItem) {
      dispatch(deleteSearchHistory(modalState.selectedItem?.id ?? ""));
    } else if (modalState.type === "clearAll") {
      dispatch(deleteAllSearchHistory());
    }
    setModalState({ type: null, selectedItem: null });
  };

  const handleCancel = () => {
    setModalState({ type: null, selectedItem: null });
  };

  return (
    <div className="search-history-container">
      <div className="search-history-header">
        <div className="search-history-text">Search History</div>
        <button className="clear-all-button" onClick={handleClearAll}>
          Clear All
        </button>
      </div>
      {searchHistory.length > 0 && (
        <div className="search-history-list">
          {searchHistory?.map((item, index) => (
            <SearchHistoryItem
              key={item.id}
              item={item}
              index={index}
              handleDelete={() => handleDelete(item)}
              handleSelect={() => handleSelect(item)}
            />
          ))}
        </div>
      )}
      {modalState.type && (
        <ConfirmModal
          isOpen={modalState.type !== null}
          onClose={handleCancel}
          onConfirm={handleConfirm}
          message={
            modalState.type === "delete"
              ? `Are you sure you want to delete this ${modalState.selectedItem?.city} search history?`
              : "Are you sure you want to clear all search history?"
          }
        />
      )}
    </div>
  );
};

export default SearchHistoryComponent;
