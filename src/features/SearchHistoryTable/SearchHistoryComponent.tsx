// Import the necessary React Redux hooks and types
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
// Import the necessary actions from the SearchHistorySlice
import {
  deleteAllSearchHistory,
  deleteSearchHistory,
} from "./SearchHistorySlice";
import { SearchHistoryItemComponent } from "../../shared/component/SearchHistoryItem/SearchHistoryItem";
import { WeatherWidgetData } from "../../shared/typings";
import "./SearchHistoryComponent.css";
import ConfirmModal from "../../shared/component/Modal/Modal";
import { useCallback, useMemo, useState } from "react";

interface SearchHistoryComponentProps {
  handleSelect: (item: WeatherWidgetData) => void;
  handleDeleteFromHistory?: (item: WeatherWidgetData | null) => void;
}

const SearchHistoryComponent: React.FC<SearchHistoryComponentProps> = ({
  handleSelect,
  handleDeleteFromHistory,
}) => {
  const searchHistory = useSelector(
    (state: RootState) => state.searchHistory.history,
  );
  // Get the dispatch function from the Redux store
  const dispatch = useDispatch<AppDispatch>();

  // Store the modal state (type and selected item)
  const [modalState, setModalState] = useState<{
    type: string | null;
    selectedItem: WeatherWidgetData | null;
  }>({
    type: null,
    selectedItem: null,
  });

  // Callback function to handle deletion of a search history item
  const handleDelete = useCallback(
    (item: WeatherWidgetData) => {
      setModalState({ type: "delete", selectedItem: item });
    },
    [setModalState],
  );

  // Callback function to handle clearing all search history
  const handleClearAll = useCallback(() => {
    setModalState({ type: "clearAll", selectedItem: null });
  }, [setModalState]);

  // Function to handle confirmation of the modal
  const handleConfirm = () => {
    if (
      modalState.type === "delete" &&
      modalState.selectedItem &&
      modalState?.selectedItem !== undefined
    ) {
      dispatch(deleteSearchHistory(modalState.selectedItem?.id ?? ""));
      handleDeleteFromHistory?.(modalState?.selectedItem);
    } else if (modalState.type === "clearAll") {
      dispatch(deleteAllSearchHistory());
      handleDeleteFromHistory?.(null);
    }
    setModalState({ type: null, selectedItem: null });
  };

  //Function to handle cancellation of the modal
  const handleCancel = () => {
    setModalState({ type: null, selectedItem: null });
  };

  // Memoize the search history list to prevent unnecessary re-renders
  const searchHistoryList = useMemo(() => {
    const sortedList = [...searchHistory]; // Create a copy of the array
    return sortedList
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((item, index) => (
        <SearchHistoryItemComponent
          key={item.id}
          item={item}
          index={index}
          handleDelete={() => handleDelete(item)}
          handleSelect={() => handleSelect(item)}
        />
      ));
  }, [searchHistory, handleDelete, handleSelect]);

  return (
    <div className="search-history-container">
      <div className="search-history-header">
        <div className="search-history-text">Search History</div>
        {searchHistoryList.length > 0 && (
          <button className="clear-all-button" onClick={handleClearAll}>
            Clear All
          </button>
        )}
      </div>
      {searchHistory.length > 0 && (
        /* Conditional rendering of the search history list */
        <div className="search-history-list">{searchHistoryList}</div>
      )}
      {modalState.type /* Conditional rendering of the ConfirmModal */ && (
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
