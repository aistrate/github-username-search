import type { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

type FetchState<Data, FetchArg> = {
  data?: Data;
  error?: string;
  httpStatus?: number;
  fetchArg?: FetchArg;
  isLoading: boolean;
};

const createFetchThunk = <Data, FetchArg, ResponseData>(
  typePrefix: string,
  getRequestUrl: (fetchArg: FetchArg) => string | null,
  extractData: (responseData: ResponseData) => Data
) =>
  createAsyncThunk<
    FetchState<Data, FetchArg>,
    FetchArg,
    { rejectValue: FetchState<Data, FetchArg> }
  >(typePrefix, async (fetchArg, { rejectWithValue }) => {
    const requestUrl = getRequestUrl(fetchArg);

    if (!requestUrl) {
      return { isLoading: false };
    }

    let response: Response;
    try {
      response = await fetch(requestUrl, fetchOptions);
    } catch (err) {
      return rejectWithValue({
        error: `Error: ${(err as Error).message}`,
        isLoading: false,
      });
    }

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue({
        error: `HTTP Error: (${response.status}) ${errorData.message}`,
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

function addFetchCaseReducers<Data, FetchArg>(
  builder: ActionReducerMapBuilder<FetchState<Data, FetchArg>>,
  fetchThunk: AsyncThunk<
    FetchState<Data, FetchArg>,
    FetchArg,
    { rejectValue: FetchState<Data, FetchArg> }
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
      return { ...action.payload, fetchArg: action.meta.arg };
    })
    .addCase(fetchThunk.rejected, (_state, action) => {
      const newState: FetchState<Data, FetchArg> =
        // error generated with rejectWithValue()
        action.payload || {
          // error NOT generated with rejectWithValue()
          error: `Unexpected error: ${action.error.message}`,
          isLoading: false,
        };
      return { ...newState, fetchArg: action.meta.arg };
    });
}

export type { FetchState };

export { createFetchThunk, addFetchCaseReducers };
