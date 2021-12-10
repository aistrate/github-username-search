import type { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

type FetchState<Data, ThunkArg> = {
  data?: Data;
  error?: string;
  httpStatus?: number;
  arg?: ThunkArg;
  isLoading: boolean;
};

const createFetchThunk = <Data, ThunkArg, ResponseData>(
  typePrefix: string,
  getRequestUrl: (arg: ThunkArg) => string | null,
  extractData: (responseData: ResponseData) => Data
) =>
  createAsyncThunk<
    FetchState<Data, ThunkArg>,
    ThunkArg,
    { rejectValue: FetchState<Data, ThunkArg> }
  >(typePrefix, async (thunkArg, { rejectWithValue }) => {
    const requestUrl = getRequestUrl(thunkArg);

    if (!requestUrl) {
      return { isLoading: false };
    }

    let response: Response;
    try {
      response = await fetch(requestUrl, fetchOptions);
    } catch (err) {
      const error = `Error: ${(err as Error).message}`;
      return rejectWithValue({ error, isLoading: false });
    }

    if (!response.ok) {
      const errorData = await response.json();
      const error = `HTTP Error: (${response.status}) ${errorData.message}`;
      return rejectWithValue({
        error,
        httpStatus: response.status,
        isLoading: false,
      });
    }

    const responseData: ResponseData = await response.json();
    return {
      data: extractData(responseData),
      httpStatus: response.status,
      isLoading: false,
    };
  });

// define the environment variable in file .env.development.local (NOT production);
// the file should not be tracked by source control (add to .gitignore)
const auth = process.env.REACT_APP_GITHUB_API_AUTH;

// this will increase the GitHub API rate limit from 60 to 5000 requests/hour
const fetchOptions = auth
  ? { headers: new Headers({ Authorization: auth }) }
  : undefined;

function addFetchCaseReducers<Data, ThunkArg>(
  builder: ActionReducerMapBuilder<FetchState<Data, ThunkArg>>,
  fetchThunk: AsyncThunk<
    FetchState<Data, ThunkArg>,
    ThunkArg,
    { rejectValue: FetchState<Data, ThunkArg> }
  >
) {
  builder
    .addCase(fetchThunk.pending, (state) => {
      return {
        data: state.data, // to avoid flickering
        isLoading: true,
      };
    })
    .addCase(fetchThunk.fulfilled, (_state, action) => {
      return { ...action.payload, arg: action.meta.arg };
    })
    .addCase(fetchThunk.rejected, (_state, action) => {
      const payload = action.payload || { isLoading: false };
      return { ...payload, arg: action.meta.arg };
    });
}

export type { FetchState };

export { createFetchThunk, addFetchCaseReducers };
