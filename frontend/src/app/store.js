import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import postSlice from "../features/posts/postSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
