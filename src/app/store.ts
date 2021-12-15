import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import historyReducer from "../features/history/historySlice";
import reposReducer from "../features/search/reposSlice";
import userReducer from "../features/search/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    repos: reposReducer,
    history: historyReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
