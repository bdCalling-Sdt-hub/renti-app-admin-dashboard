import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  allUsers: [],
  pagination: {},
};
const token = localStorage.token;

export const AllUsers = createAsyncThunk(
  "AllUsers",
  async (value, thunkAPI) => {
    try {
      const response = await axios.get(`api/user/all`, {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.rejectWithValue(message);
    }
  }
);

//create slice for host
export const allUserSlice = createSlice({
  name: "allUser",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.hostsData = [];
      state.pagination = {};
    },
  },

  extraReducers: {
    [AllUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [AllUsers.fulfilled]: (state, action) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.allUsers = action.payload.users;
      state.pagination = action.payload.pagination;
    },
    [AllUsers.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const {} = allUserSlice.actions;

export default allUserSlice.reducer;
