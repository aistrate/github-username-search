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
      const data: User = await response.json();
      return extractUserFields(data);
    } else {
      return null;
    }
  }
);

function getUserUrl(username: string) {
  return `https://api.github.com/users/${username}`;
}

function extractUserFields(user: User): User {
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
    resetUser() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<User | null>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      );
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

export const { resetUser } = userSlice.actions;
