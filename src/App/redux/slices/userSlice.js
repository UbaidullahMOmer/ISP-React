import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DZapi } from "../services/DZapi";

// Async thunk to fetch login user data
export const fetchLoginUser = createAsyncThunk(
  "user/fetchLoginUser",
  async (_, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.DZapi.getLoginUser();
      console.log("response from useSlice =>>", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Reducer for fetchLoginUser async thunk
    builder.addCase(fetchLoginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearUserData } = userSlice.actions;

export default userSlice.reducer;
