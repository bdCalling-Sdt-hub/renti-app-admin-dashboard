import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  Error: false,
  Success: false,
  Loading: false,
  HostData: [],
  pagination: {},
};

let token = localStorage.getItem("token");

// ${value.page}&search=${value.search}
export const HostInformationWithKycData = createAsyncThunk(
  "HostInfo",
  async (value, thunkAPI) => {
    try {
      let response = await axios.get(
        //`/api/user/all-host?limit=10&page=${value.page}&search=${value.search}`,
        `api/user/all-host?approve=${value?.approve}&isBanned=${value?.isBanned}&limit=${value?.limit}&page=${value?.page}&search=${value?.search}`,
        {
          headers: {
            "Content-Type": "application/json",
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

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const HostInformationWithKycSlice = createSlice({
  name: "hostinfo",
  initialState,
  reducers: {
    reset: (state) => {
      state.Loading = false;
      state.Success = false;
      state.Error = false;
      (state.HostData = []), (state.pagination = {});
    },
  },
  extraReducers: {
    [HostInformationWithKycData.pending]: (state, action) => {
      state.Loading = true;
    },
    [HostInformationWithKycData.fulfilled]: (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.Error = false;
      (state.HostData = action.payload.hostData),
        (state.pagination = action.payload.pagination);
    },
    [HostInformationWithKycData.rejected]: (state, action) => {
      state.Loading = false;
      state.Success = false;
      state.Error = true;
      (state.HostData = []), (state.pagination = {});
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = HostInformationWithKycSlice.actions;

export default HostInformationWithKycSlice.reducer;
