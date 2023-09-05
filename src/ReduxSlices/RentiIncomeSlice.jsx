import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  rentiIncome: [],
  pagination: {},
};

const token = localStorage.token;

export const RentiIncomes = createAsyncThunk(
  "RentiIncomes",
  async (value, thunkApi) => {
    try {
      const response = await axios.get("api/income/renti-payment-list", {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const rentiIncomeSlice = createSlice({
  name: "rentiIncomes",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.rentiIncome = [];
    },
  },
  extraReducers: {
    [RentiIncomes.pending]: (state, action) => {
      isLoading: true;
    },
    [RentiIncomes.fulfilled]: (state, action) => {
      console.log("res", action.payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload;
    },
    [RentiIncomes.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const {} = rentiIncomeSlice.actions;

export default rentiIncomeSlice.reducer;
