import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  hostsData: [],
};

const token = localStorage.token;

//async request handle here
export const HostsData = createAsyncThunk(
  "HostsData",
  async (value, thunkAPI) => {
    try {
      let response = await axios.get("api/user/all-host?limit=2&page=1", {
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
export const hostDataSlice = createSlice({
  name: "hostsData",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.hostsData = []);
    },
  },

  extraReducers: {
    [HostsData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [HostsData.fulfilled]: (state, action) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.hostsData = action.payload.hostData;
    },
    [HostsData.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const {} = hostDataSlice.actions;

export default hostDataSlice.reducer;
