import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  incomeData: {},
};

let token = localStorage.getItem("token");

export const IncomeData = createAsyncThunk(
  "Income",
  async (value, thunkAPI) => {
    try {
      let response = await axios.get("/api/dashboard/income/", {
        headers: {
          "Content-Type": "application/json",
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

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const incomeGetSlice = createSlice({
  name: "income",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.incomeData = {};
    },
  },
  extraReducers: {
    [IncomeData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [IncomeData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.incomeData = action.payload;
    },
    [IncomeData.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = incomeGetSlice.actions;

export default incomeGetSlice.reducer;
