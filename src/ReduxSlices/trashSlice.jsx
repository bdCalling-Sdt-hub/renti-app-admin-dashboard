import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  trashUsers: [],
  pagination: {},
};
const token = localStorage.token;

export const TrashUser = createAsyncThunk(
  "TrashUser",
  async (value, thunkAPI) => {
    try {
      const response = await axios.get(
        `api/user/trash?limit=${value?.limit}&page=${value?.page}`,
        {
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

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
export const TrashSlice = createSlice({
  name: "trash",
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
    [TrashUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [TrashUser.fulfilled]: (state, action) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.message = action.payload.message;
      state.trashUsers = action.payload.trashUsers;
      state.pagination = action.payload.pagination;
    },
    [TrashUser.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const {} = TrashSlice.actions;

export default TrashSlice.reducer;
