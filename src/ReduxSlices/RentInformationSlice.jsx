import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  Error: false,
  Success: false,
  Loading: false,
  rentsByHour: {},
  rentCompletedTotalAmount: null,
  rentReservedTotalAmount: null,
  totalRejectedAmount: null,
  rents: [],
  pagination: {},
};

let token = localStorage.getItem("token");

export const RentInformationData = createAsyncThunk(
  "RentInfo",
  async (value, thunkAPI) => {
    console.log("rent page number", value);
    try {
      let response = await axios.get(
        `/api/rent/all/?limit=5&page=${value.page}&search=${value.search}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log("mydataksdjfklsdjkfljsdklfjklsdjf55555555",response.data);
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

export const RentInformationSlice = createSlice({
  name: "rentinfo",
  initialState,
  reducers: {
    reset: (state) => {
      state.Loading = false;
      state.Success = false;
      state.Error = false;
      (state.rentsByHour = {}),
        (state.rentCompletedTotalAmount = null),
        (state.rentReservedTotalAmount = null),
        (state.totalRejectedAmount = null),
        (state.rents = []),
        (state.pagination = {});
    },
  },
  extraReducers: {
    [RentInformationData.pending]: (state, action) => {
      state.Loading = true;
    },
    [RentInformationData.fulfilled]: (state, action) => {
      //console.log("tushar-saiful",action.payload)
      state.Loading = false;
      state.Success = true;
      state.Error = false;
      (state.rentsByHour = action.payload.rentsByHour),
        (state.rentCompletedTotalAmount =
          action.payload.rentCompletedTotalAmount),
        (state.rentReservedTotalAmount =
          action.payload.rentReservedTotalAmount),
        (state.totalRejectedAmount = action.payload.totalRejectedAmount),
        (state.rents = action.payload.rents),
        (state.pagination = action.payload.pagination);
    },
    [RentInformationData.rejected]: (state, action) => {
      state.Loading = false;
      state.Success = false;
      state.Error = true;
      (state.rentsByHour = {}),
        (state.rentCompletedTotalAmount = null),
        (state.rentReservedTotalAmount = null),
        (state.totalRejectedAmount = null),
        (state.rents = []),
        (state.pagination = {});
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = RentInformationSlice.actions;

export default RentInformationSlice.reducer;
