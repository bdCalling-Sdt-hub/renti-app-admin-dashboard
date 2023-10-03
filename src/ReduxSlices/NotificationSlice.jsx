import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  allNotification: [],
  notView: null,
  pagination: {},
};
const token = localStorage.token;

export const Notifications = createAsyncThunk(
  "Notifications",
  async (value, thunkAPI) => {
    console.log("reduxGrab", value);
    try {
      const response = await axios.get(`api/notifications`, {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

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
export const NotificationsSlice = createSlice({
  name: "Notifications",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.allNotification = [];
      state.pagination = {};
      state.notView = null;
    },
  },

  extraReducers: {
    [Notifications.pending]: (state, action) => {
      state.isLoading = true;
    },
    [Notifications.fulfilled]: (state, action) => {
      console.log(action.payload.data);
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.allNotification = action.payload.data?.allNotification;
      state.pagination = action.payload.data?.pagination;
      state.notView = action.payload.data?.notViewed;
    },
    [Notifications.rejected]: (state, action) => {
      state.isError = true;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = action.payload;
    },
  },
});

export const {} = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
