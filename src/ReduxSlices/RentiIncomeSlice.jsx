import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  rentiIncomeList: [],
  pagination: {},
  rentiTotalIncome: null,
  rentiTotalPaid: null,
};

const token = localStorage.token;

export const RentiIncomes = createAsyncThunk(
  "RentiIncomes",
  async (value, thunkApi) => {
    console.log(value.search);
    try {
      const response = await axios.get(
        `api/income/renti-payment-list?page=${value?.page}&limit=${value?.limit}&rentTripNumber=${value.search}`,
        {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data)

      return response.data;
    } catch (error) {
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
      console.log(action.payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.rentiTotalIncome = action.payload.rentiTotalIncome;
      state.rentiTotalPaid = action.payload.totalPaid;
      state.pagination = action.payload.pagination;
      state.rentiIncomeList = action.payload.userPaymentList;
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
