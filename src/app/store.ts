import { configureStore } from "@reduxjs/toolkit";
import reposReducer from "../features/search/reposSlice";
import userReducer from "../features/search/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    repos: reposReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
