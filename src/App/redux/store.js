import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { DZapi } from "./services/DZapi";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    [DZapi.reducerPath]: DZapi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(DZapi.middleware),
});

setupListeners(store.dispatch);
