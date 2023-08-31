import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userData: {},
  accessToken: "",
};

export const UserData = createAsyncThunk(
  "UserData",
  async (value, thunkAPI) => {
    try {
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = signinSlice.actions;

export default signinSlice.reducer;
