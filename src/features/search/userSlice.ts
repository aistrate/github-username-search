import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./models";

type UserState = {
  data: User | null;
  httpStatus: number | null;
  error: string | null;
  isLoading: boolean;
  requestUrl: string | null;
};

const initialState: UserState = {
  data: null,
  httpStatus: null,
  error: null,
  isLoading: false,
  requestUrl: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userReceived: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.isLoading = false;
    },
  },
});

export default userSlice.reducer;

export const { userReceived } = userSlice.actions;
