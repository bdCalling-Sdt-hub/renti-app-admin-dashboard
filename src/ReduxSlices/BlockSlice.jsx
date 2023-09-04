import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  Error: false,
  Success: false,
  Loading: false,
  blockUser: [],
};

let token = localStorage.getItem("token");

export const BLockUser = createAsyncThunk(
  "BlockUser",
  async (value, thunkAPI) => {
    try {
      const response = await axios.get("api/user/banned/all", {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      return response.data;
    } catch (err) {
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

export const BlockUserSlice = createSlice({
  name: "blockUser",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.blockUser = [];
    },
  },

  extraReducers: {
    [BLockUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [BLockUser.fulfilled]: (state, action) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.blockUser = action.payload.bannedUsers;
    },
    [BLockUser.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const {} = BlockUserSlice.actions;

export default BlockUserSlice.reducer;
