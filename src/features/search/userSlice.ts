import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./models";

const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (username: string) => {
    if (!username) {
      return null;
    }

    const response = await fetch(getUserUrl(username), fetchOptions);
    if (response.ok) {
      return await response.json();
    }
  }
);

function getUserUrl(username: string) {
  return `https://api.github.com/users/${username}`;
}

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.data = action.payload;
      });
  },
});

// define the environment variable in file .env.development.local (NOT production);
// the file should not be tracked by source control (add to .gitignore)
const auth = process.env.REACT_APP_GITHUB_API_AUTH;

// this will increase the GitHub API rate limit from 60 to 5000 requests/hour
const fetchOptions = auth
  ? { headers: new Headers({ Authorization: auth }) }
  : undefined;

export default userSlice.reducer;

export { fetchUser };
