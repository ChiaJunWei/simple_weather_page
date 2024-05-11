import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoryItem } from "../../shared/typings";



interface SearchHistoryState {
  history: HistoryItem[];
}

const initialState: SearchHistoryState = {
  history: [],
};

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState,
  reducers: {
    addSearchHistory: (state, action: PayloadAction<HistoryItem>) => {
      state.history = [...state.history, action.payload]; 
    },
    deleteSearchHistory: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter(item => item.id !== action.payload);
    },
    deleteAllSearchHistory: (state, ) => {
      state.history = [];
    },
    
  },
});

export const { addSearchHistory ,deleteSearchHistory,deleteAllSearchHistory} = searchHistorySlice.actions;
export default searchHistorySlice.reducer;