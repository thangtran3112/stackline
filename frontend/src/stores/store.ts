import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    products: productsReducer,
  },
});

export type AppStore = typeof store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
