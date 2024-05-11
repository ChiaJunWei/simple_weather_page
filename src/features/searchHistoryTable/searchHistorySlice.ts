import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  WeatherWidgetData } from "../../shared/typings";



interface SearchHistoryState {
  history: WeatherWidgetData[];
}

const initialState: SearchHistoryState = {
  history: [],
};

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState,
  reducers: {
    addSearchHistory: (state, action: PayloadAction<WeatherWidgetData>) => {
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