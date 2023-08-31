import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  hostsData: [],
};

//async request handle here
export const HostsData = createAsyncThunk(
  "HostsData",
  async (value, thunkAPI) => {
    try {
      let response = await axios.post("api/user/all", value);

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
export const hostDataSlice = createSlice({
  name: "hostsData",
  initialState,
  reducers: {},
});

export const {} = hostDataSlice.actions;

export default hostDataSlice.reducer;
