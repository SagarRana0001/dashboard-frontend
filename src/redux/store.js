import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/slice.js";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
