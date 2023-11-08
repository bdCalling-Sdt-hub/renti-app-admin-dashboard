import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../Config";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  allNotification: [],
  pagination: {},
};
const token = localStorage.token;

export const Notifications = createAsyncThunk(
  "Notifications",
  async (value, thunkAPI) => {
    console.log("reduxGrab", value);
    try {
      const response = await axios.get(
        `api/notifications?limit=${value.limit}&page=${value.page}`,
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
    },
  },

  extraReducers: {
    [Notifications.pending]: (state, action) => {
      state.isLoading = true;
    },
    [Notifications.fulfilled]: (state, action) => {
      state.isError = false;
      state.isSuccess = true;
      state.isLoading = false;
      state.allNotification = action.payload.data;
      state.pagination = action.payload.data?.pagination;
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
