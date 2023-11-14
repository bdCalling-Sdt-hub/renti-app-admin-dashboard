import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  Error: false,
  Success: false,
  Loading: false,
  rentStatus: {},
};

let token = localStorage.getItem("token");

export const RentStatusData = createAsyncThunk(
  "RentStatus",
  async (value, thunkAPI) => {
    try {
      let response = await axios.get("/api/dashboard/rent-status", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      if (
        "You are not authorized to sign in now" === error.response.data.message
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("yourInfo");
      }
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

export const RentStatusSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    reset: (state) => {
      state.Loading = false;
      state.Success = false;
      state.Error = false;
      state.rentStatus = {};
    },
  },
  extraReducers: {
    [RentStatusData.pending]: (state, action) => {
      state.Loading = true;
    },
    [RentStatusData.fulfilled]: (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.Error = false;
      state.rentStatus = action.payload;
    },
    [RentStatusData.rejected]: (state, action) => {
      state.Loading = false;
      state.Success = false;
      state.Error = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = RentStatusSlice.actions;

export default RentStatusSlice.reducer;
