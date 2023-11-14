import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifyShow: true,
};

const notificationOnOffSlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    notifyOnOff: (state, action) => {
      state.notifyShow = action.payload;
    },
  },
});

export const { notifyOnOff } = notificationOnOffSlice.actions;
export default notificationOnOffSlice.reducer;
