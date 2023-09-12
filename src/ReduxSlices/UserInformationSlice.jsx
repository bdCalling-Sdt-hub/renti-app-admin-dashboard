import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  Error: false,
  Success: false,
  Loading: false,
  userInfoWithTripAmount: [],
  pagination: {},
};

let token = localStorage.getItem("token");

export const UserInformationData = createAsyncThunk(
  "UserInfo",
  async (value, thunkAPI) => {
    try {
      let response = await axios.get(
        `/api/user/all-user?limit=2&page=${value.page}&search=${value.search}`,
        {
          headers: {
            "Content-Type": "application/json",
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

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UserInformationSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    reset: (state) => {
      state.Loading = false;
      state.Success = false;
      state.Error = false;
      (state.userInfoWithTripAmount = []), (state.pagination = {});
    },
  },
  extraReducers: {
    [UserInformationData.pending]: (state, action) => {
      state.Loading = true;
    },
    [UserInformationData.fulfilled]: (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.Error = false;
      state.userInfoWithTripAmount = action.payload.usersWithTripAmount;
      state.pagination = action.payload.pagination;
    },
    [UserInformationData.rejected]: (state, action) => {
      state.Loading = false;
      state.Success = false;
      state.Error = true;
      (state.userInfoWithTripAmount = []), (state.pagination = {});
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = UserInformationSlice.actions;

export default UserInformationSlice.reducer;
