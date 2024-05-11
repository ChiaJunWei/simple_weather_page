import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchHistoryState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  history: any[];
}

const initialState: SearchHistoryState = {
  history: [],
};

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState,
  reducers: {

    addSearchItem: (state, action: PayloadAction<string>) => {
      state.history.push(action.payload);
    },
    deleteSearchItem: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter((item) => item !== action.payload);
    },
  },
});

export const { addSearchItem ,deleteSearchItem} = searchHistorySlice.actions;
export default searchHistorySlice.reducer;