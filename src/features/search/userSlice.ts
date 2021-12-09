import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { FetchState } from "../../common/fetchThunk";
import { createFetchThunk } from "../../common/fetchThunk";
import type { User } from "./models";

const fetchUser = createFetchThunk<User, string, User>(
  "user/fetchUser",
  getUserUrl,
  selectUserFields
);

function getUserUrl(username: string) {
  return username ? `https://api.github.com/users/${username}` : null;
}

function selectUserFields(user: User): User {
  return {
    id: user.id,
    avatar_url: user.avatar_url,
    name: user.name,
    login: user.login,
    type: user.type,
    html_url: user.html_url,
    created_at: user.created_at,
    bio: user.bio,
    followers: user.followers,
    company: user.company,
    location: user.location,
    email: user.email,
    blog: user.blog,
    twitter_username: user.twitter_username,
    public_repos: user.public_repos,
  };
}

const initialState = {
  isLoading: false,
} as FetchState<User>;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        return {
          data: state.data, // to avoid flickering
          isLoading: true,
        };
      })
      .addCase(fetchUser.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(fetchUser.rejected, (_state, action) => {
        return action.payload;
      });
  },
});

const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

export { fetchUser, selectUser };

export const { resetUser } = userSlice.actions;
