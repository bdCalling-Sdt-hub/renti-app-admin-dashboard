import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userPayments: [],
  pagination: {},
};

const token = localStorage.token;

export const UserPayments = createAsyncThunk(
  "UserPayments",
  async (value, thunkAPI) => {
    console.log(value)
    try {
      const response = await axios.get(
        `api/income/user-payment-list?page=${value?.page}&limit=${value?.limit}`,
        {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

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
export const userPaymentSlice = createSlice({
  name: "userPayments",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.userPayments = [];
      state.pagination = {};
    },
  },

  extraReducers: {
    [UserPayments.pending]: (state, action) => {
      state.isLoading = true;
    },
    [UserPayments.fulfilled]: (state, action) => {
      console.log("user payment", action.payload);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.userPayments = action.payload.userPaymentList;
      state.pagination = action.payload.pagination;
    },
    [UserPayments.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const {} = userPaymentSlice.actions;

export default userPaymentSlice.reducer;
