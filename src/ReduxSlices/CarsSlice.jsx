import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  carsData: [],
};

const token = localStorage.token;

//async request handle here
export const CarsData = createAsyncThunk(
  "CarsData",
  async (value, thunkAPI) => {
    console.log(value);
    try {
      let response = await axios.get(
        `/api/car/all-req?isCarActive=${value.isCarActive}&page=${value.page}&limit=${value.limit}`,
        {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response", response.data);
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
export const carsDataSlice = createSlice({
  name: "carsData",
  initialState,
  reducers: {
    reset: (state) => {
      (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.carsData = []);
    },
  },

  extraReducers: {
    [CarsData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [CarsData.fulfilled]: (state, action) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.carsData = action.payload;
    },
    [CarsData.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const {} = carsDataSlice.actions;

export default carsDataSlice.reducer;
