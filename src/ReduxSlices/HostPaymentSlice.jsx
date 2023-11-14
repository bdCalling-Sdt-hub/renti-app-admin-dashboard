import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  hostPaymentList: [],
  pagination: {},
};

const token = localStorage.token;

//async request handle here
export const HostPaymentData = createAsyncThunk(
  "HostPayment",
  async (value, thunkAPI) => {
    try {
      let response = await axios.get(
        `api/income/host-payment-list?limit=${value?.limit}&page=${value?.page}&search=${value.search}`,
        {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (
        "You are not authorised to sign in now" === error.response.data.message
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

      thunkAPI.rejectWithValue(message);
    }
  }
);

//create slice for host
export const hostPaymentSlice = createSlice({
  name: "hostpayment",
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
    [HostPaymentData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [HostPaymentData.fulfilled]: (state, action) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.hostPaymentList = action.payload.hostPaymentList;
      state.pagination = action.payload.pagination;
    },
    [HostPaymentData.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const {} = hostPaymentSlice.actions;

export default hostPaymentSlice.reducer;
