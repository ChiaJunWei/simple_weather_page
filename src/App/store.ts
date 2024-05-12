import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage"; // Choose your storage engine (e.g., localStorage)
import searchHistoryReducer from "../features/SearchHistoryTable/SearchHistorySlice";

// Combine reducers into a single rootReducer
const rootReducer = combineReducers({
  searchHistory: searchHistoryReducer,
});

// Configure Redux Persist
const persistConfig = {
  key: 'root', // Key for the persisted data
  storage, // either localStorage or sessionStorage depending on the browser's support.
  whitelist: ['searchHistory'], // Specify which reducers to persist (in this case, only searchHistory)
};

// Create a persisted reducer by wrapping the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false, // Ignore redux-persist's serializable check 
    });
  },
});

// Create a persistor to handle loading and saving persisted data
export const persistor = persistStore(store);

// Export types for the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
