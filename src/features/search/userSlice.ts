import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { FetchState } from "../../common/fetchThunk";
import {
  addFetchCaseReducers,
  createFetchThunk,
} from "../../common/fetchThunk";
import type { User } from "./models";

const fetchUser = createFetchThunk<User, string, User>(
  "user/fetchUser",
  getUserUrl,
  extractUserData
);

function getUserUrl(username: string) {
  return username ? `https://api.github.com/users/${username}` : null;
}

function extractUserData(user: User): User {
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
    addFetchCaseReducers(builder, fetchUser);
  },
});

const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;

export { fetchUser, selectUser };

export const { resetUser } = userSlice.actions;
