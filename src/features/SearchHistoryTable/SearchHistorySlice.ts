// Import the necessary functions and types from @reduxjs/toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherWidgetData } from "../../shared/typings";

// Define the shape of the search history state
interface SearchHistoryState {
  history: WeatherWidgetData[]; // Array of WeatherWidgetData objects
}

// Define the initial state of the search history
const initialState: SearchHistoryState = {
  history: [], // Initialize the history array as empty
};

// Create a slice of the Redux store for search history
const searchHistorySlice = createSlice({
  name: "searchHistory", // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    // Reducer function to add a new search history item to the state
    addSearchHistory: (state, action: PayloadAction<WeatherWidgetData>) => {
      state.history = [...state.history, action.payload]; 
    },
    // Reducer function to delete a search history item by ID
    deleteSearchHistory: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(item => item.id !== action.payload);
    },
    // Reducer function to delete all search history items
    deleteAllSearchHistory: (state, ) => {
      state.history = []; // Reset the history array to empty
    },
    
  },
});

export const { addSearchHistory ,deleteSearchHistory,deleteAllSearchHistory} = searchHistorySlice.actions;
export default searchHistorySlice.reducer;