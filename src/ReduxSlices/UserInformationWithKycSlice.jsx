import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  Error: false,
  Success: false,
  Loading: false,
  UserData: [],
  pagination: {},
};

let token = localStorage.getItem("token");

// ${value.page}&search=${value.search}
export const UserInformationWithKycData = createAsyncThunk(
  "UserInfo",
  async (value, thunkAPI) => {
    try {
      let response = await axios.get(
        `/api/user/all-user-info?limit=2&page=${value.page}&search=${value.search}`,
        {
          headers: {
            "Content-Type": "application/json",
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

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const UserInformationWithKycSlice = createSlice({
  name: "userinfo",
  initialState,
  reducers: {
    reset: (state) => {
      state.Loading = false;
      state.Success = false;
      state.Error = false;
      (state.UserData = []), (state.pagination = {});
    },
  },
  extraReducers: {
    [UserInformationWithKycData.pending]: (state, action) => {
      state.Loading = true;
    },
    [UserInformationWithKycData.fulfilled]: (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.Error = false;
      (state.UserData = action.payload.userData),
        (state.pagination = action.payload.pagination);
    },
    [UserInformationWithKycData.rejected]: (state, action) => {
      state.Loading = false;
      state.Success = false;
      state.Error = true;
      (state.UserData = []), (state.pagination = {});
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = UserInformationWithKycSlice.actions;

export default UserInformationWithKycSlice.reducer;
